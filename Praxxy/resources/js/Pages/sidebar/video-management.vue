<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, BarChart2, InfoIcon } from 'lucide-vue-next';
import VideoPlayer from '@/Components/VideoPlayer.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { ref, onMounted } from 'vue';

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

const videoInput = ref(null);
const thumbnailInput = ref(null);
const showSuccessAlert = ref(false);
const showErrorAlert = ref(false);
const alertMessage = ref('');

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
            <h2 class="text-xl font-semibold leading-tight text-black">
                Video Management
            </h2>
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

                <div class="mb-8 flex items-center">
                    <BarChart2 class="w-8 h-8 mr-3 text-gray-700" />
                    <h3 class="text-2xl font-bold text-gray-800">Video Management</h3>
                </div>

                <!-- Upload Video Form -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h4 class="text-lg font-semibold mb-4">Upload New Video</h4>
                    <form @submit.prevent="form.post('/videos', {
                        preserveScroll: true,
                        onSuccess: () => {
                            form.reset();
                            videoInput.value = null;
                            thumbnailInput.value = null;
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
                            ></textarea>
                            <InputError :message="form.errors.description" class="mt-2" />
                        </div>

                        <div>
                            <InputLabel for="video" value="Video File" />
                            <input
                                id="video"
                                ref="videoInput"
                                type="file"
                                @input="form.video = $event.target.files[0]"
                                accept="video/*"
                                class="mt-1 block w-full"
                                required
                            />
                            <InputError :message="form.errors.video" class="mt-2" />
                            <p class="mt-1 text-sm text-gray-500">Max file size: 100MB</p>
                        </div>

                        <div>
                            <InputLabel for="thumbnail" value="Thumbnail (Optional)" />
                            <input
                                id="thumbnail"
                                ref="thumbnailInput"
                                type="file"
                                @input="form.thumbnail = $event.target.files[0]"
                                accept="image/*"
                                class="mt-1 block w-full"
                            />
                            <InputError :message="form.errors.thumbnail" class="mt-2" />
                            <p class="mt-1 text-sm text-gray-500">Max file size: 2MB</p>
                        </div>

                        <div class="flex items-center">
                            <PrimaryButton :disabled="form.processing" class="mr-2">
                                {{ form.processing ? 'Uploading...' : 'Upload Video' }}
                            </PrimaryButton>
                            <div v-if="form.processing" class="text-sm text-gray-500">
                                Please wait while your video is being uploaded...
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Video List -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h4 class="text-lg font-semibold mb-4">Video Library</h4>
                    <div v-if="videos.length === 0" class="text-center py-8 text-gray-500">
                        No videos uploaded yet.
                    </div>
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="video in videos" :key="video.id" class="bg-gray-50 rounded-lg overflow-hidden">
                            <VideoPlayer
                                :url="video.url"
                                :thumbnail="video.thumbnail"
                                class="w-full aspect-video"
                            />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg">{{ video.title }}</h3>
                                <p class="text-gray-600 text-sm mt-1">{{ video.description }}</p>
                                <p class="text-gray-500 text-xs mt-2">{{ video.formatted_created_at }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
