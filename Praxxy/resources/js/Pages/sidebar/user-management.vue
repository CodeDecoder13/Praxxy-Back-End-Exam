<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, Pencil, Trash, X } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import axios from 'axios';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';

const props = defineProps({
    users: {
        type: Array,
        required: true
    },
    flash: {
        type: Object,
        default: () => ({})
    }
});

// Modal states
const viewModalOpen = ref(false);
const editModalOpen = ref(false);
const deleteModalOpen = ref(false);
const createModalOpen = ref(false);
const selectedUser = ref(null);
const processing = ref(false);
const errorMessage = ref('');
const createErrorMessages = ref({});
const createSuccessMessage = ref('');
const deleteProcessing = ref(false);
const deleteErrorMessage = ref('');
const deleteSuccessMessage = ref('');
const editErrorMessages = ref({});
const editSuccessMessage = ref('');
const editProcessing = ref(false);

// Form handling
const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

// Create user form
const createForm = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

// Edit form
const editForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

// Reset create form
const resetCreateForm = () => {
    createForm.value = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    createErrorMessages.value = {};
    createSuccessMessage.value = '';
};

// Reset edit form
const resetEditForm = () => {
    editForm.reset();
    editErrorMessages.value = {};
    editSuccessMessage.value = '';
};

// Create user
const submitCreateForm = async () => {
    try {
        processing.value = true;
        createErrorMessages.value = {};
        createSuccessMessage.value = '';

        const response = await axios.post('/users', createForm.value);
        
        if (response.data.success) {
            createSuccessMessage.value = response.data.message;
            // Refresh the users list
            router.reload({ only: ['users'] });
            
            // Show success message and close modal after delay
            setTimeout(() => {
                createModalOpen.value = false;
            }, 2000);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.response?.status === 422) {
            createErrorMessages.value = error.response.data.errors;
        } else {
            createErrorMessages.value = {
                general: ['An error occurred while creating the user']
            };
        }
    } finally {
        processing.value = false;
    }
};

// Delete user
const openDeleteModal = (user) => {
    selectedUser.value = user;
    deleteModalOpen.value = true;
    deleteErrorMessage.value = '';
    deleteSuccessMessage.value = '';
};

const confirmDelete = async () => {
    try {
        deleteProcessing.value = true;
        deleteErrorMessage.value = '';
        deleteSuccessMessage.value = '';

        const response = await axios.delete(`/users/${selectedUser.value.id}`);
        
        if (response.data.success) {
            deleteSuccessMessage.value = response.data.message;
            // Refresh the users list
            router.reload({ only: ['users'] });
            
            // Show success message and close modal after delay
            setTimeout(() => {
                deleteModalOpen.value = false;
            }, 2000);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        deleteErrorMessage.value = error.response?.data?.message || 'Failed to delete user';
    } finally {
        deleteProcessing.value = false;
    }
};

// Watch create modal
watch(createModalOpen, (newValue) => {
    if (!newValue) {
        resetCreateForm();
    }
});

// View user
const openViewModal = (user) => {
    selectedUser.value = user;
    viewModalOpen.value = true;
};

// Edit user
const openEditModal = (user) => {
    selectedUser.value = user;
    editForm.reset();
    editForm.name = user.name;
    editForm.email = user.email;
    editModalOpen.value = true;
    editErrorMessages.value = {};
    editSuccessMessage.value = '';
};

const submitEdit = () => {
    editProcessing.value = true;
    editErrorMessages.value = {};
    editSuccessMessage.value = '';

    // Validate required fields
    const errors = {};
    if (!editForm.name.trim()) {
        errors.name = ['Name is required'];
    }
    if (!editForm.email.trim()) {
        errors.email = ['Email is required'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
        errors.email = ['Please enter a valid email address'];
    }

    // If password is provided, validate it
    if (editForm.password) {
        if (editForm.password.length < 8) {
            errors.password = ['Password must be at least 8 characters'];
        }
        if (editForm.password !== editForm.password_confirmation) {
            errors.password_confirmation = ['Passwords do not match'];
        }
    }

    if (Object.keys(errors).length > 0) {
        editErrorMessages.value = errors;
        editProcessing.value = false;
        return;
    }

    editForm.put(`/users/${selectedUser.value.id}`, {
        onSuccess: () => {
            editSuccessMessage.value = 'User updated successfully';
            setTimeout(() => {
                editModalOpen.value = false;
                selectedUser.value = null;
            }, 2000);
        },
        onError: (errors) => {
            editErrorMessages.value = errors;
        },
        onFinish: () => {
            editProcessing.value = false;
        }
    });
};

// Watch edit modal
watch(editModalOpen, (newValue) => {
    if (!newValue) {
        resetEditForm();
    }
});
</script>

<template>
    <Head title="User Management" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-black">
                User Management
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- Success Message -->
                <div v-if="flash.success" class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    {{ flash.success }}
                </div>

                <div class="mb-8 flex items-center justify-between">
                    <div class="flex items-center">
                        <Users class="w-8 h-8 mr-3 text-gray-700" />
                        <h3 class="text-2xl font-bold text-gray-800">Users List</h3>
                    </div>
                    <button @click="createModalOpen = true"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150">
                        <UserPlus class="w-4 h-4 mr-2" />
                        Add User
                    </button>
                </div>

                <!-- Users Table -->
                <div class="overflow-x-auto bg-white rounded-lg shadow">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Created
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ format(new Date(user.created_at), 'MMM dd, yyyy') }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <div class="flex space-x-3">
                                        <button @click="openViewModal(user)" 
                                                class="text-blue-600 hover:text-blue-900">
                                            <Eye class="w-5 h-5" />
                                        </button>
                                        <button @click="openEditModal(user)"
                                                class="text-yellow-600 hover:text-yellow-900">
                                            <Pencil class="w-5 h-5" />
                                        </button>
                                        <button @click="openDeleteModal(user)"
                                                class="text-red-600 hover:text-red-900">
                                            <Trash class="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Create User Modal -->
        <div v-if="createModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-lg max-w-lg w-full">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">Create New User</h3>
                        <button @click="createModalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <X class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Success Message -->
                    <div v-if="createSuccessMessage" 
                         class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
                        <span>{{ createSuccessMessage }}</span>
                        <span class="text-sm">Closing in 2 seconds...</span>
                    </div>

                    <!-- General Error Message -->
                    <div v-if="createErrorMessages.general" 
                         class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        {{ createErrorMessages.general[0] }}
                    </div>

                    <form @submit.prevent="submitCreateForm" class="space-y-4">
                        <div>
                            <label for="create-name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="create-name" v-model="createForm.name"
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                   :class="{ 'border-red-500': createErrorMessages.name }"
                                   required />
                            <p v-if="createErrorMessages.name" class="mt-1 text-sm text-red-600">
                                {{ createErrorMessages.name[0] }}
                            </p>
                        </div>

                        <div>
                            <label for="create-email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="create-email" v-model="createForm.email"
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                   :class="{ 'border-red-500': createErrorMessages.email }"
                                   required />
                            <p v-if="createErrorMessages.email" class="mt-1 text-sm text-red-600">
                                {{ createErrorMessages.email[0] }}
                            </p>
                        </div>

                        <div>
                            <label for="create-password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="create-password" v-model="createForm.password"
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                   :class="{ 'border-red-500': createErrorMessages.password }"
                                   required />
                            <p v-if="createErrorMessages.password" class="mt-1 text-sm text-red-600">
                                {{ createErrorMessages.password[0] }}
                            </p>
                        </div>

                        <div>
                            <label for="create-password-confirmation" class="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input type="password" id="create-password-confirmation" v-model="createForm.password_confirmation"
                                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                   :class="{ 'border-red-500': createErrorMessages.password_confirmation }"
                                   required />
                            <p v-if="createErrorMessages.password_confirmation" class="mt-1 text-sm text-red-600">
                                {{ createErrorMessages.password_confirmation[0] }}
                            </p>
                        </div>

                        <div class="mt-6 flex space-x-3">
                            <button type="button" @click="createModalOpen = false"
                                    :disabled="processing"
                                    class="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                Cancel
                            </button>
                            <button type="submit"
                                    :disabled="processing"
                                    class="flex-1 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                <span v-if="processing" class="flex items-center">
                                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                                <span v-else>Create User</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- View Modal -->
        <div v-if="viewModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg max-w-lg w-full">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">View User Details</h3>
                        <button @click="viewModalOpen = false" class="text-gray-400 hover:text-gray-600">
                            <X class="w-5 h-5" />
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Name</label>
                            <p class="mt-1 text-sm text-gray-900">{{ selectedUser?.name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <p class="mt-1 text-sm text-gray-900">{{ selectedUser?.email }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Created At</label>
                            <p class="mt-1 text-sm text-gray-900">
                                {{ selectedUser ? format(new Date(selectedUser.created_at), 'MMM dd, yyyy HH:mm:ss') : '' }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <button @click="viewModalOpen = false"
                                class="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div v-if="editModalOpen" class="fixed inset-0 z-50 overflow-y-auto"
                 role="dialog"
                 aria-modal="true">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold">Edit User</h3>
                            <button @click="editModalOpen = false"
                                    :disabled="editProcessing"
                                    class="text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors">
                                <X class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Success Message -->
                        <Transition
                            enter-active-class="transition-opacity duration-300"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-opacity duration-200"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <div v-if="editSuccessMessage"
                                 class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
                                <span>{{ editSuccessMessage }}</span>
                                <span class="text-sm">Closing in 2 seconds...</span>
                            </div>
                        </Transition>

                        <!-- General Error Message -->
                        <Transition
                            enter-active-class="transition-opacity duration-300"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-opacity duration-200"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <div v-if="editErrorMessages.general"
                                 class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {{ editErrorMessages.general[0] }}
                            </div>
                        </Transition>

                        <form @submit.prevent="submitEdit" class="space-y-4">
                            <!-- Name Input -->
                            <div>
                                <label for="edit-name" class="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text"
                                       id="edit-name"
                                       v-model="editForm.name"
                                       :class="{'border-red-500': editErrorMessages.name}"
                                       class="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                       :disabled="editProcessing">
                                <p v-if="editErrorMessages.name" class="mt-1 text-sm text-red-600">
                                    {{ editErrorMessages.name[0] }}
                                </p>
                            </div>

                            <!-- Email Input -->
                            <div>
                                <label for="edit-email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email"
                                       id="edit-email"
                                       v-model="editForm.email"
                                       :class="{'border-red-500': editErrorMessages.email}"
                                       class="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                       :disabled="editProcessing">
                                <p v-if="editErrorMessages.email" class="mt-1 text-sm text-red-600">
                                    {{ editErrorMessages.email[0] }}
                                </p>
                            </div>

                            <!-- Password Input -->
                            <div>
                                <label for="edit-password" class="block text-sm font-medium text-gray-700">
                                    Password <span class="text-gray-400">(leave blank to keep current)</span>
                                </label>
                                <input type="password"
                                       id="edit-password"
                                       v-model="editForm.password"
                                       :class="{'border-red-500': editErrorMessages.password}"
                                       class="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                       :disabled="editProcessing">
                                <p v-if="editErrorMessages.password" class="mt-1 text-sm text-red-600">
                                    {{ editErrorMessages.password[0] }}
                                </p>
                            </div>

                            <!-- Password Confirmation Input -->
                            <div>
                                <label for="edit-password-confirmation" class="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input type="password"
                                       id="edit-password-confirmation"
                                       v-model="editForm.password_confirmation"
                                       :class="{'border-red-500': editErrorMessages.password_confirmation}"
                                       class="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                       :disabled="editProcessing">
                                <p v-if="editErrorMessages.password_confirmation" class="mt-1 text-sm text-red-600">
                                    {{ editErrorMessages.password_confirmation[0] }}
                                </p>
                            </div>

                            <div class="mt-6 flex gap-3 sm:gap-4">
                                <button type="button"
                                        @click="editModalOpen = false"
                                        :disabled="editProcessing"
                                        class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                        :disabled="editProcessing"
                                        class="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
                                    <svg v-if="editProcessing"
                                         class="animate-spin -ml-1 mr-2 h-4 w-4"
                                         fill="none"
                                         viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {{ editProcessing ? 'Saving...' : 'Save Changes' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Delete Modal -->
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div v-if="deleteModalOpen" class="fixed inset-0 z-50 overflow-y-auto" 
                 role="dialog"
                 aria-modal="true">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-semibold text-red-600">Delete User</h3>
                            <button @click="deleteModalOpen = false" 
                                    :disabled="deleteProcessing"
                                    class="text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors">
                                <X class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Success Message -->
                        <Transition
                            enter-active-class="transition-opacity duration-300"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-opacity duration-200"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <div v-if="deleteSuccessMessage" 
                                 class="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
                                <span>{{ deleteSuccessMessage }}</span>
                                <span class="text-sm">Closing in 2 seconds...</span>
                            </div>
                        </Transition>

                        <!-- Error Message -->
                        <Transition
                            enter-active-class="transition-opacity duration-300"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-opacity duration-200"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <div v-if="deleteErrorMessage" 
                                 class="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {{ deleteErrorMessage }}
                            </div>
                        </Transition>

                        <div class="space-y-4">
                            <p class="text-sm text-gray-500">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div class="bg-gray-50 p-4 rounded-lg space-y-1">
                                <p class="text-sm font-medium text-gray-900">{{ selectedUser?.name }}</p>
                                <p class="text-sm text-gray-500">{{ selectedUser?.email }}</p>
                                <p class="text-xs text-gray-400">
                                    Created {{ selectedUser ? format(new Date(selectedUser.created_at), 'MMM dd, yyyy') : '' }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 flex gap-3 sm:gap-4">
                            <button 
                                @click="deleteModalOpen = false"
                                :disabled="deleteProcessing"
                                class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                @click="confirmDelete"
                                :disabled="deleteProcessing"
                                class="flex-1 inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                            >
                                <svg 
                                    v-if="deleteProcessing"
                                    class="animate-spin -ml-1 mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {{ deleteProcessing ? 'Deleting...' : 'Delete User' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

    </AuthenticatedLayout>
</template>
