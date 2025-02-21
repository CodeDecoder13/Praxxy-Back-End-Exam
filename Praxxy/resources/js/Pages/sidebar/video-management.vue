<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, BarChart2, InfoIcon } from 'lucide-vue-next';
import VideoPlayer from '@/Components/VideoPlayer.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { ref, onMounted } from 'vue';
import Modal from '@/Components/Modal.vue';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from 'lucide-vue-next';

const props = defineProps({
    videos: {
        type: Array,
        default: () => []
    },
    flash: {
        type: Object,
        default: () => ({})
    }
});

const form = useForm({
    title: '',
    description: '',
    video: null,
    thumbnail: null
});

const editForm = useForm({
    title: '',
    description: '',
    video: null,
    thumbnail: null
});

const videoInput = ref(null);
const thumbnailInput = ref(null);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const alertMessage = ref('');
const showUploadModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedVideo = ref(null);
const selectedVideoName = ref('');
const selectedThumbnailName = ref('');
const videoPreviewUrl = ref('');
const thumbnailPreviewUrl = ref('');

const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.video = file;
        selectedVideoName.value = file.name;
        // Create preview URL for video
        videoPreviewUrl.value = URL.createObjectURL(file);
    }
};

const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.thumbnail = file;
        selectedThumbnailName.value = file.name;
        // Create preview URL for thumbnail
        thumbnailPreviewUrl.value = URL.createObjectURL(file);
    }
};

const openEditModal = (video) => {
    selectedVideo.value = video;
    editForm.title = video.title;
    editForm.description = video.description;
    showEditModal.value = true;
};

const openDeleteModal = (video) => {
    selectedVideo.value = video;
    showDeleteModal.value = true;
};

const closeModal = () => {
    showUploadModal.value = false;
    form.reset();
    videoInput.value = null;
    thumbnailInput.value = null;
    selectedVideoName.value = '';
    selectedThumbnailName.value = '';
    if (videoPreviewUrl.value) {
        URL.revokeObjectURL(videoPreviewUrl.value);
        videoPreviewUrl.value = '';
    }
    if (thumbnailPreviewUrl.value) {
        URL.revokeObjectURL(thumbnailPreviewUrl.value);
        thumbnailPreviewUrl.value = '';
    }
};

const closeEditModal = () => {
    showEditModal.value = false;
    selectedVideo.value = null;
    editForm.reset();
    if (videoPreviewUrl.value) {
        URL.revokeObjectURL(videoPreviewUrl.value);
        videoPreviewUrl.value = '';
    }
    if (thumbnailPreviewUrl.value) {
        URL.revokeObjectURL(thumbnailPreviewUrl.value);
        thumbnailPreviewUrl.value = '';
    }
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedVideo.value = null;
};

const handleDelete = () => {
    if (!selectedVideo.value) return;
    
    router.delete(`/videos/${selectedVideo.value.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            closeDeleteModal();
            showAlert('Video deleted successfully!', 'success');
        },
        onError: (errors) => {
            const errorMessage = Object.values(errors)[0];
            showAlert(errorMessage, 'error');
        }
    });
};

// Show alert message
const showAlert = (message, type) => {
    alertMessage.value = message;
    if (type === 'success') {
        showSuccessAlert.value = true;
        setTimeout(() => {
            showSuccessAlert.value = false;
        }, 5000);
    } else {
        showErrorAlert.value = true;
        setTimeout(() => {
            showErrorAlert.value = false;
        }, 5000);
    }
};

// Watch for flash messages
onMounted(() => {
    if (props.flash.success) {
        showAlert(props.flash.success, 'success');
    }
    if (props.flash.error) {
        showAlert(props.flash.error, 'error');
    }
});
</script>

<template>
    <Head title="Video Management" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold leading-tight text-black">
                    Video Management
                </h2>
                <button 
                    @click="showUploadModal = true"
                    class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                >
                    <PlusIcon class="w-5 h-5 mr-2" />
                    Add Video
                </button>
            </div>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <!-- Success Alert -->
                <div v-if="showSuccessAlert" class="mb-4 rounded-md bg-green-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-green-800">{{ alertMessage }}</p>
                        </div>
                    </div>
                </div>

                <!-- Error Alert -->
                <div v-if="showErrorAlert" class="mb-4 rounded-md bg-red-50 p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-red-800">{{ alertMessage }}</p>
                        </div>
                    </div>
                </div>

                <!-- Video Library -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <div v-if="videos.length === 0" class="text-center py-12">
                        <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
                        <p class="text-gray-500 mb-4">Get started by uploading your first video</p>
                        <button 
                            @click="showUploadModal = true"
                            class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
                        >
                            <PlusIcon class="w-5 h-5 mr-2" />
                            Upload Video
                        </button>
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <div v-for="video in videos" :key="video.id" 
                            class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200"
                        >
                            <div class="relative">
                                <VideoPlayer
                                    :url="video.url"
                                    :thumbnail="video.thumbnail"
                                    class="w-full aspect-video object-cover"
                                />
                                <div class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                    {{ video.duration || '0:00' }}
                                </div>
                            </div>
                            <div class="p-4">
                                <h3 class="font-medium text-gray-900 text-lg line-clamp-2">{{ video.title }}</h3>
                                <p class="text-gray-500 text-sm mt-1 line-clamp-2">{{ video.description }}</p>
                                <div class="flex items-center justify-between mt-3">
                                    <div class="text-sm text-gray-500">
                                        <span>{{ video.views || 0 }} views</span>
                                        <span class="mx-2">•</span>
                                        <span>{{ video.created_at }}</span>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button 
                                            @click="openEditModal(video)"
                                            class="p-1 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                                            title="Edit video"
                                        >
                                            <PencilIcon class="w-5 h-5" />
                                        </button>
                                        <button 
                                            @click="openDeleteModal(video)"
                                            class="p-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                                            title="Delete video"
                                        >
                                            <TrashIcon class="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upload Modal -->
                <Modal :show="showUploadModal" @close="closeModal">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-gray-900">Upload New Video</h3>
                            <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>

                        <form @submit.prevent="form.post('/videos', {
                            preserveScroll: true,
                            onSuccess: () => {
                                closeModal();
                                showAlert('Video uploaded successfully!', 'success');
                            },
                            onError: (errors) => {
                                const errorMessage = Object.values(errors)[0];
                                showAlert(errorMessage, 'error');
                            }
                        })" class="space-y-6">
                            <div>
                                <InputLabel for="title" value="Title" />
                                <TextInput
                                    id="title"
                                    v-model="form.title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                    placeholder="Enter video title"
                                />
                                <InputError :message="form.errors.title" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="description" value="Description" />
                                <textarea
                                    id="description"
                                    v-model="form.description"
                                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="3"
                                    placeholder="Enter video description"
                                ></textarea>
                                <InputError :message="form.errors.description" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="video" value="Video File" />
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200"
                                    :class="{ 'border-indigo-500 bg-indigo-50': selectedVideoName }">
                                    <div class="space-y-1 text-center">
                                        <template v-if="!selectedVideoName">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-gray-600">
                                                <label for="video" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a video</span>
                                                    <input
                                                        id="video"
                                                        ref="videoInput"
                                                        type="file"
                                                        @input="handleVideoSelect"
                                                        accept="video/*"
                                                        class="sr-only"
                                                        required
                                                    />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs text-gray-500">MP4, WebM up to 100MB</p>
                                        </template>
                                        <template v-else>
                                            <div class="relative">
                                                <video v-if="videoPreviewUrl" 
                                                    class="mx-auto h-32 w-auto rounded-lg shadow-sm" 
                                                    :src="videoPreviewUrl"
                                                    controls
                                                ></video>
                                                <div class="mt-2 text-sm text-gray-900">
                                                    <p class="font-medium">{{ selectedVideoName }}</p>
                                                    <p class="text-gray-500 text-xs">Click to change video</p>
                                                </div>
                                                <input
                                                    id="video"
                                                    ref="videoInput"
                                                    type="file"
                                                    @input="handleVideoSelect"
                                                    accept="video/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    required
                                                />
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <InputError :message="form.errors.video" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="thumbnail" value="Thumbnail (Optional)" />
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200"
                                    :class="{ 'border-indigo-500 bg-indigo-50': selectedThumbnailName }">
                                    <div class="space-y-1 text-center">
                                        <template v-if="!selectedThumbnailName">
                                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <div class="flex text-sm text-gray-600">
                                                <label for="thumbnail" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a thumbnail</span>
                                                    <input
                                                        id="thumbnail"
                                                        ref="thumbnailInput"
                                                        type="file"
                                                        @input="handleThumbnailSelect"
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                        </template>
                                        <template v-else>
                                            <div class="relative">
                                                <img v-if="thumbnailPreviewUrl" 
                                                    :src="thumbnailPreviewUrl" 
                                                    class="mx-auto h-32 w-auto rounded-lg shadow-sm object-cover" 
                                                    alt="Thumbnail preview"
                                                />
                                                <div class="mt-2 text-sm text-gray-900">
                                                    <p class="font-medium">{{ selectedThumbnailName }}</p>
                                                    <p class="text-gray-500 text-xs">Click to change thumbnail</p>
                                                </div>
                                                <input
                                                    id="thumbnail"
                                                    ref="thumbnailInput"
                                                    type="file"
                                                    @input="handleThumbnailSelect"
                                                    accept="image/*"
                                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <InputError :message="form.errors.thumbnail" class="mt-2" />
                            </div>

                            <div class="flex items-center justify-end pt-4">
                                <button
                                    type="button"
                                    class="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    @click="closeModal"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton :disabled="form.processing" class="ml-3">
                                    {{ form.processing ? 'Uploading...' : 'Upload Video' }}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>

                <!-- Edit Modal -->
                <Modal :show="showEditModal" @close="closeEditModal">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-gray-900">Edit Video</h3>
                            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-500">
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>

                        <form @submit.prevent="editForm.put(`/videos/${selectedVideo?.id}`, {
                            preserveScroll: true,
                            onSuccess: () => {
                                closeEditModal();
                                showAlert('Video updated successfully!', 'success');
                            },
                            onError: (errors) => {
                                const errorMessage = Object.values(errors)[0];
                                showAlert(errorMessage, 'error');
                            }
                        })" class="space-y-6">
                            <div>
                                <InputLabel for="edit-title" value="Title" />
                                <TextInput
                                    id="edit-title"
                                    v-model="editForm.title"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                    placeholder="Enter video title"
                                />
                                <InputError :message="editForm.errors.title" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="edit-description" value="Description" />
                                <textarea
                                    id="edit-description"
                                    v-model="editForm.description"
                                    class="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="3"
                                    placeholder="Enter video description"
                                ></textarea>
                                <InputError :message="editForm.errors.description" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="edit-video" value="Video File (Optional)" />
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="edit-video" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a new video</span>
                                                <input
                                                    id="edit-video"
                                                    type="file"
                                                    @input="editForm.video = $event.target.files[0]"
                                                    accept="video/*"
                                                    class="sr-only"
                                                />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs text-gray-500">Leave empty to keep current video</p>
                                    </div>
                                </div>
                                <InputError :message="editForm.errors.video" class="mt-2" />
                            </div>

                            <div>
                                <InputLabel for="edit-thumbnail" value="Thumbnail (Optional)" />
                                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors duration-200">
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="edit-thumbnail" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a new thumbnail</span>
                                                <input
                                                    id="edit-thumbnail"
                                                    type="file"
                                                    @input="editForm.thumbnail = $event.target.files[0]"
                                                    accept="image/*"
                                                    class="sr-only"
                                                />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs text-gray-500">Leave empty to keep current thumbnail</p>
                                    </div>
                                </div>
                                <InputError :message="editForm.errors.thumbnail" class="mt-2" />
                            </div>

                            <div class="flex items-center justify-end pt-4">
                                <button
                                    type="button"
                                    class="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    @click="closeEditModal"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton :disabled="editForm.processing" class="ml-3">
                                    {{ editForm.processing ? 'Updating...' : 'Update Video' }}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </Modal>

                <!-- Delete Confirmation Modal -->
                <Modal :show="showDeleteModal" @close="closeDeleteModal">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold text-gray-900">Delete Video</h3>
                            <button @click="closeDeleteModal" class="text-gray-400 hover:text-gray-500">
                                <XIcon class="w-6 h-6" />
                            </button>
                        </div>

                        <div class="mb-6">
                            <p class="text-gray-700">Are you sure you want to delete this video? This action cannot be undone.</p>
                            <p class="mt-2 text-sm text-gray-500">Video title: {{ selectedVideo?.title }}</p>
                        </div>

                        <div class="flex items-center justify-end">
                            <button
                                type="button"
                                class="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                @click="closeDeleteModal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                @click="handleDelete"
                            >
                                Delete Video
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
