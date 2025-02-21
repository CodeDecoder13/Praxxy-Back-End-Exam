<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, BarChart2, InfoIcon, Search, Filter, ChevronLeft, ChevronRight, Plus, Pencil, Trash2, X, Save } from 'lucide-vue-next';
import ChartComponent from '@/Components/ChartComponent.vue';
import ProductMultiStepForm from '@/Components/ProductMultiStepForm.vue';
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import debounce from 'lodash/debounce';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const success = ref(null);
const searchQuery = ref('');
const selectedCategory = ref('');
const categories = ref([]);
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
});
const editingProduct = ref(null);
const showEditModal = ref(false);
const editForm = ref({
    name: '',
    description: '',
    category: '',
    date_and_time: '',
    images: []
});
const newImages = ref([]);
const imagesToDelete = ref([]);
const formErrors = ref({});
const showAddProductForm = ref(false);
const showViewModal = ref(false);
const selectedProduct = ref(null);
const selectedImage = ref(null);
const showImageModal = ref(false);
const isSubmitting = ref(false);

const showingFrom = computed(() => {
    if (products.value.length === 0) return 0;
    return (pagination.value.current_page - 1) * pagination.value.per_page + 1;
});

const showingTo = computed(() => {
    return Math.min(
        pagination.value.current_page * pagination.value.per_page,
        pagination.value.total
    );
});

const fetchCategories = async () => {
    try {
        const uniqueCategories = new Set(products.value.map(product => product.category));
        categories.value = Array.from(uniqueCategories).filter(Boolean);
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
};

const fetchProducts = async (search = '', category = '', page = 1) => {
    try {
        loading.value = true;
        const response = await axios.get('/products', {
            params: {
                search: search,
                category: category,
                page: page
            }
        });
        products.value = response.data.data;
        pagination.value = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            per_page: response.data.per_page,
            total: response.data.total
        };
        await fetchCategories();
    } catch (err) {
        error.value = 'Failed to load products';
        console.error('Error:', err);
    } finally {
        loading.value = false;
    }
};

const changePage = (page) => {
    if (page >= 1 && page <= pagination.value.last_page) {
        fetchProducts(searchQuery.value, selectedCategory.value, page);
    }
};

// Debounced search function
const debouncedSearch = debounce(async (query, category) => {
    try {
        loading.value = true;
        const response = await axios.get('/products', {
            params: {
                search: query,
                category: category
            }
        });
        products.value = response.data.data;
        pagination.value = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            per_page: response.data.per_page,
            total: response.data.total
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        error.value = 'Failed to fetch products';
    } finally {
        loading.value = false;
    }
}, 300);

// Watch for changes in search query or category
watch([searchQuery, selectedCategory], ([newQuery, newCategory]) => {
    debouncedSearch(newQuery.toLowerCase(), newCategory);
});

// Function to show success message temporarily
const showSuccessMessage = (message) => {
    success.value = message;
    setTimeout(() => {
        success.value = null;
    }, 3000); // Hide after 3 seconds
};

// Function to validate form
const validateForm = () => {
    formErrors.value = {};
    let isValid = true;

    if (!editForm.value.name.trim()) {
        formErrors.value.name = 'Name is required';
        isValid = false;
    }

    if (!editForm.value.category.trim()) {
        formErrors.value.category = 'Category is required';
        isValid = false;
    }

    if (!editForm.value.description.trim()) {
        formErrors.value.description = 'Description is required';
        isValid = false;
    }

    if (!editForm.value.date_and_time.trim()) {
        formErrors.value.date_and_time = 'Date and Time is required';
        isValid = false;
    }

    return isValid;
};

// Add this helper function
const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
};

// Edit product function
const editProduct = (product) => {
    editingProduct.value = product;
    editForm.value = {
        name: product.name,
        description: product.description,
        category: product.category,
        date_and_time: formatDateForInput(product.date_and_time),
        images: [...product.images]
    };
    newImages.value = [];
    imagesToDelete.value = [];
    formErrors.value = {};
    error.value = null;
    showEditModal.value = true;
};

// Save edited product
const saveProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) return;

    isSubmitting.value = true;
    try {
        const formData = new FormData(e.target);
        formData.append('_method', 'PUT');
        
        // Append existing images
        editForm.value.images.forEach((image, index) => {
            formData.append(`existing_images[${index}]`, image);
        });

        // Append images to delete
        imagesToDelete.value.forEach((image, index) => {
            formData.append(`images_to_delete[${index}]`, image);
        });

        // Append new images
        newImages.value.forEach((image, index) => {
            formData.append(`new_images[${index}]`, image.file);
        });

        const response = await axios.post(`/products/${editingProduct.value.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        showSuccessMessage('Product updated successfully');
        await fetchProducts(searchQuery.value, selectedCategory.value, pagination.value.current_page);
        showEditModal.value = false;
        editingProduct.value = null;
    } catch (err) {
        if (err.response?.data?.errors) {
            formErrors.value = err.response.data.errors;
        } else {
            error.value = 'Failed to update product';
        }
        console.error('Error:', err);
    } finally {
        isSubmitting.value = false;
    }
};

// Delete product function
const deleteProduct = async (product) => {
    const productName = product.name;
    
    // Show a more detailed confirmation dialog
    if (!confirm(`Are you sure you want to delete "${productName}"?\n\nThis action cannot be undone.`)) return;
    
    try {
        await axios.delete(`/products/${product.id}`);
        showSuccessMessage(`"${productName}" has been deleted successfully`);
        // Refresh the current page of products
        await fetchProducts(searchQuery.value, selectedCategory.value, pagination.value.current_page);
    } catch (err) {
        error.value = `Failed to delete "${productName}". Please try again.`;
        console.error('Error:', err);
    }
};

// View product function
const viewProduct = (product) => {
    selectedProduct.value = product;
    showViewModal.value = true;
};

// View full image function
const viewFullImage = (image) => {
    selectedImage.value = image;
    showImageModal.value = true;
};

const handleProductSubmitted = async (productData) => {
    showSuccessMessage('Product added successfully');
    showAddProductForm.value = false;
    await fetchProducts(searchQuery.value, selectedCategory.value, pagination.value.current_page);
};

const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
            if (editForm.value.images.length + newImages.value.length < 5) {
                newImages.value.push({
                    file: file,
                    preview: URL.createObjectURL(file)
                });
            } else {
                error.value = 'Maximum 5 images allowed';
                break;
            }
        }
    }
};

const removeImage = (index, isNew = false) => {
    if (isNew) {
        URL.revokeObjectURL(newImages.value[index].preview);
        newImages.value.splice(index, 1);
    } else {
        imagesToDelete.value.push(editForm.value.images[index]);
        editForm.value.images.splice(index, 1);
    }
};

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <Head title="Product Management" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-black">
                Product Management
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center">
                        <BarChart2 class="w-8 h-8 mr-3 text-gray-700" />
                        <h3 class="text-2xl font-bold text-gray-800">Product Management</h3>
                    </div>
                    
                    <div class="flex items-center gap-4">
                        <!-- Add Product Button -->
                        <button
                            @click="showAddProductForm = true"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Plus class="w-4 h-4 mr-2" />
                            Add Product
                        </button>

                        <div class="flex items-center gap-4 flex-1 md:flex-none">
                            <!-- Search Bar -->
                            <div class="relative flex items-center flex-1 md:w-64">
                                <Search class="absolute left-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    v-model="searchQuery"
                                    placeholder="Search by name or description..."
                                    class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div v-if="searchQuery" 
                                     class="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <button
                                        @click="searchQuery = ''"
                                        class="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Category Filter -->
                            <div class="relative flex items-center min-w-[200px]">
                                <Filter class="absolute left-3 h-5 w-5 text-gray-400" />
                                <select
                                    v-model="selectedCategory"
                                    class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="">All Categories</option>
                                    <option v-for="category in categories" :key="category" :value="category">
                                        {{ category }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Message -->
                <div v-if="success" class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        {{ success }}
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-between">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                        </svg>
                        {{ error }}
                    </div>
                </div>

                <!-- Add Product Modal -->
                <div v-if="showAddProductForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 overflow-hidden">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-lg font-medium text-gray-900">Add New Product</h3>
                                <button
                                    @click="showAddProductForm = false"
                                    class="text-gray-400 hover:text-gray-500"
                                >
                                    <span class="sr-only">Close</span>
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <ProductMultiStepForm
                                @submitted="handleProductSubmitted"
                                @cancelled="showAddProductForm = false"
                            />
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
                </div>

                <!-- Products Table -->
                <div v-else class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {{ product.name }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ product.category }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500">
                                        <div class="max-w-xs truncate">
                                            {{ product.description }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ new Date(product.created_at).toLocaleString() }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div class="flex items-center space-x-2">
                                            <button
                                                @click="viewProduct(product)"
                                                class="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="View Product"
                                            >
                                                <Eye class="w-5 h-5" />
                                            </button>
                                            <button
                                                @click="editProduct(product)"
                                                class="text-green-600 hover:text-green-800 transition-colors"
                                                title="Edit Product"
                                            >
                                                <Pencil class="w-5 h-5" />
                                            </button>
                                            <button
                                                @click="deleteProduct(product)"
                                                class="text-red-600 hover:text-red-800 transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 class="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="products.length === 0">
                                    <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Edit Modal -->
                    <div v-if="showEditModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div class="bg-white rounded-lg p-6 max-w-5xl w-full mx-4">
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-2xl font-semibold text-gray-900">Edit Product</h3>
                                <button 
                                    @click="showEditModal = false"
                                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <X class="w-6 h-6" />
                                </button>
                            </div>

                            <form @submit="saveProduct" class="space-y-6">
                                <div class="flex flex-col md:flex-row gap-6">
                                    <!-- Form Fields -->
                                    <div class="flex-1 space-y-6">
                                        <div class="form-group">
                                            <label for="name" class="block text-sm font-medium text-gray-700 required">Name</label>
                                            <input 
                                                id="name"
                                                name="name"
                                                type="text" 
                                                v-model="editForm.name"
                                                required
                                                minlength="3"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">{{ formErrors.name[0] }}</p>
                                        </div>

                                        <div class="form-group">
                                            <label for="category" class="block text-sm font-medium text-gray-700 required">Category</label>
                                            <select 
                                                id="category"
                                                name="category"
                                                v-model="editForm.category"
                                                required
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="">Select a category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Food">Food</option>
                                                <option value="Books">Books</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <p v-if="formErrors.category" class="mt-1 text-sm text-red-600">{{ formErrors.category[0] }}</p>
                                        </div>

                                        <div class="form-group">
                                            <label for="description" class="block text-sm font-medium text-gray-700 required">Description</label>
                                            <textarea 
                                                id="description"
                                                name="description"
                                                v-model="editForm.description"
                                                required
                                                minlength="10"
                                                rows="4"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            ></textarea>
                                            <p v-if="formErrors.description" class="mt-1 text-sm text-red-600">{{ formErrors.description[0] }}</p>
                                        </div>

                                        <div class="form-group">
                                            <label for="date_and_time" class="block text-sm font-medium text-gray-700 required">Date and Time</label>
                                            <input 
                                                id="date_and_time"
                                                name="date_and_time"
                                                type="datetime-local" 
                                                v-model="editForm.date_and_time"
                                                required
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            <p class="mt-1 text-xs text-gray-500">Current: {{ new Date(editingProduct?.date_and_time).toLocaleString() }}</p>
                                            <p v-if="formErrors.date_and_time" class="mt-1 text-sm text-red-600">{{ formErrors.date_and_time[0] }}</p>
                                        </div>
                                    </div>

                                    <!-- Images Section -->
                                    <div class="w-full md:w-1/2">
                                        <div class="mb-4">
                                            <label class="block text-sm font-medium text-gray-700">Current Image</label>
                                            <p class="text-sm text-gray-500">Click the image to remove it</p>
                                            <div class="grid grid-cols-2 gap-4 mt-2">
                                                <div 
                                                    v-for="(image, index) in editForm.images" 
                                                    :key="'existing-' + index"
                                                    class="relative aspect-square cursor-pointer group"
                                                    @click="removeImage(index)"
                                                >
                                                    <img 
                                                        :src="image" 
                                                        class="w-full h-full object-cover rounded-lg shadow-sm"
                                                    />
                                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="block text-sm font-medium text-gray-700"> </label>
                                            <div class="grid grid-cols-2 gap-4 mt-2">
                                                <div 
                                                    v-for="(image, index) in newImages" 
                                                    :key="'new-' + index"
                                                    class="relative aspect-square cursor-pointer group"
                                                    @click="removeImage(index, true)"
                                                >
                                                    <img 
                                                        :src="image.preview" 
                                                        class="w-full h-full object-cover rounded-lg shadow-sm"
                                                    />
                                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                        <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mt-4">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    @change="handleImageUpload"
                                                    class="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-md file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-indigo-50 file:text-indigo-700
                                                        hover:file:bg-indigo-100"
                                                />
                                                <p class="mt-1 text-sm text-gray-500">Upload up to 5 images (PNG, JPG, GIF up to 10MB each)</p>
                                                <p v-if="formErrors.images" class="mt-1 text-sm text-red-600">{{ formErrors.images[0] }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-8 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        @click="showEditModal = false"
                                        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <X class="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        :disabled="isSubmitting"
                                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        <Save class="w-4 h-4 mr-2" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- View Modal -->
                    <div v-if="showViewModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div class="bg-white rounded-lg p-6 max-w-5xl w-full mx-4">
                            <div class="flex justify-between items-center mb-6">
                                <h3 class="text-2xl font-semibold text-gray-900">Product Details</h3>
                                <button 
                                    @click="showViewModal = false"
                                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div class="flex flex-col md:flex-row gap-6">
                                <!-- Product Information -->
                                <div class="flex-1 space-y-6">
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-500">Name</h4>
                                        <p class="mt-1 text-lg text-gray-900">{{ selectedProduct?.name }}</p>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-500">Category</h4>
                                        <p class="mt-1 text-lg text-gray-900">{{ selectedProduct?.category }}</p>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-500">Description</h4>
                                        <p class="mt-1 text-lg text-gray-900">{{ selectedProduct?.description }}</p>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-500">Date and Time</h4>
                                        <p class="mt-1 text-lg text-gray-900">{{ new Date(selectedProduct?.created_at).toLocaleString() }}</p>
                                    </div>
                                </div>

                                <!-- Product Images -->
                                <div class="w-full md:w-1/2">
                                    <h4 class="text-sm font-medium text-gray-500 mb-3">Images</h4>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div 
                                            v-for="(image, index) in selectedProduct?.images" 
                                            :key="index" 
                                            class="relative aspect-square cursor-pointer group"
                                            @click="viewFullImage(image)"
                                        >
                                            <img 
                                                :src="image" 
                                                :alt="'Product image ' + (index + 1)"
                                                class="w-full h-full object-cover rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
                                            />
                                            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-end">
                                <button
                                    @click="showViewModal = false"
                                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Full Image Modal -->
                    <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                        <div class="relative max-w-7xl w-full h-full flex items-center justify-center p-4">
                            <button 
                                @click="showImageModal = false"
                                class="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                            >
                                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img 
                                :src="selectedImage" 
                                class="max-w-full max-h-full object-contain"
                                @click.stop
                            />
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 flex justify-between sm:hidden">
                                <button
                                    @click="changePage(pagination.current_page - 1)"
                                    :disabled="pagination.current_page === 1"
                                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    @click="changePage(pagination.current_page + 1)"
                                    :disabled="pagination.current_page === pagination.last_page"
                                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p class="text-sm text-gray-700">
                                        Showing
                                        <span class="font-medium">{{ showingFrom }}</span>
                                        to
                                        <span class="font-medium">{{ showingTo }}</span>
                                        of
                                        <span class="font-medium">{{ pagination.total }}</span>
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            @click="changePage(pagination.current_page - 1)"
                                            :disabled="pagination.current_page === 1"
                                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span class="sr-only">Previous</span>
                                            <ChevronLeft class="h-5 w-5" />
                                        </button>
                                        
                                        <button
                                            v-for="page in pagination.last_page"
                                            :key="page"
                                            @click="changePage(page)"
                                            :class="[
                                                page === pagination.current_page
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                                            ]"
                                        >
                                            {{ page }}
                                        </button>
                                        
                                        <button
                                            @click="changePage(pagination.current_page + 1)"
                                            :disabled="pagination.current_page === pagination.last_page"
                                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span class="sr-only">Next</span>
                                            <ChevronRight class="h-5 w-5" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
