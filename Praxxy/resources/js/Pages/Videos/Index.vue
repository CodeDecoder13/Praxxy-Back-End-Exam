<template>
  <AppLayout title="Videos">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Videos
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <!-- Upload Video Form -->
          <form @submit.prevent="form.post(route('videos.store'), {
            onSuccess: () => {
              form.reset();
              videoInput.value = null;
              thumbnailInput.value = null;
            }
          })" class="mb-8">
            <div class="grid grid-cols-1 gap-6">
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
              </div>

              <div>
                <PrimaryButton :disabled="form.processing">
                  Upload Video
                </PrimaryButton>
              </div>
            </div>
          </form>

          <!-- Video List -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/AppLayout.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import InputError from '@/Components/InputError.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue'
import VideoPlayer from '@/Components/VideoPlayer.vue'

const props = defineProps({
  videos: {
    type: Array,
    required: true
  }
})

const form = useForm({
  title: '',
  description: '',
  video: null,
  thumbnail: null
})

const videoInput = ref(null)
const thumbnailInput = ref(null)
</script>
