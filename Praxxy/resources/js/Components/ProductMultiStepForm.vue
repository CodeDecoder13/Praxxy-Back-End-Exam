<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="submitForm" class="bg-white shadow-md rounded-lg p-6">
      <!-- Step Progress -->
      <div class="mb-8">
        <div class="flex items-center justify-between relative">
          <div v-for="(step, index) in steps" :key="index" 
               class="flex items-center relative z-10">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center font-medium',
              currentStep > index ? 'bg-green-500 text-white' : 
              currentStep === index ? 'bg-blue-500 text-white' : 
              'bg-gray-200 text-gray-600'
            ]">
              {{ index + 1 }}
            </div>
            <div v-if="index < steps.length - 1" 
                 class="hidden sm:block text-sm ml-3">
              {{ step.title }}
            </div>
          </div>
          <!-- Progress Line -->
          <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
                 class="h-full bg-blue-500 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <!-- Step 1: Basic Information -->
      <div v-show="currentStep === 0" class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="formData.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-300': errors.name }"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <select
            v-model="formData.category"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-300': errors.category }"
          >
            <option value="">Select a category</option>
            <option v-for="category in availableCategories" 
                    :key="category" 
                    :value="category">
              {{ category }}
            </option>
          </select>
          <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="formData.description"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            :class="{ 'border-red-300': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>
      </div>

      <!-- Step 2: Images -->
      <div v-show="currentStep === 1" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Upload Product Images</h3>
          
          <!-- File Upload Area -->
          <div class="space-y-4">
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                </div>
                <input 
                  type="file" 
                  class="hidden" 
                  multiple 
                  @change="handleFileUpload"
                  accept="image/*"
                />
              </label>
            </div>

            <!-- Error Message -->
            <p v-if="errors.images" class="mt-2 text-sm text-red-600">
              {{ errors.images }}
            </p>

            <!-- Image Preview Grid -->
            <div v-if="formData.images.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div v-for="(image, index) in formData.images" 
                   :key="index" 
                   class="relative group rounded-lg overflow-hidden">
                <img 
                  :src="image.preview" 
                  class="w-full h-32 object-cover"
                  alt="Preview"
                />
                <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <button 
                    @click.prevent="removeImage(index)"
                    class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Date and Time -->
      <div v-show="currentStep === 2" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Schedule</h3>
          
          <!-- Date and Time Picker -->
          <div class="space-y-4">
            <div>
              <label for="dateAndTime" class="block text-sm font-medium text-gray-700">
                Select Date and Time
              </label>
              <input
                id="dateAndTime"
                v-model="formData.dateAndTime"
                type="datetime-local"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                :class="{ 'border-red-300': errors.dateAndTime }"
              />
              <p v-if="errors.dateAndTime" class="mt-2 text-sm text-red-600">
                {{ errors.dateAndTime }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Review -->
      <div v-show="currentStep === 3" class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Review Your Information</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <h4 class="text-sm font-medium text-gray-500">Name</h4>
                <p class="mt-1 text-sm text-gray-900">{{ formData.name }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Category</h4>
                <p class="mt-1 text-sm text-gray-900">{{ formData.category }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Description</h4>
                <p class="mt-1 text-sm text-gray-900">{{ formData.description }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Date and Time</h4>
                <p class="mt-1 text-sm text-gray-900">{{ new Date(formData.dateAndTime).toLocaleString() }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500">Images</h4>
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <div v-for="(image, index) in formData.images" :key="index" class="relative">
                    <img :src="image.preview" class="h-24 w-full object-cover rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div v-if="showConfirmDialog" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Submission</h3>
          <p class="text-sm text-gray-500 mb-4">Are you sure you want to upload this product?</p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showConfirmDialog = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              @click="confirmSubmit"
              :disabled="isSubmitting"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <template v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </template>
              <template v-else>
                Yes, Upload
              </template>
            </button>
          </div>
        </div>
      </div>

      <!-- Validation Dialog -->
      <div v-if="showValidationDialog" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
          <div class="mb-4">
            <h3 class="text-lg font-medium text-gray-900">Validation Check</h3>
            <button
              @click="cancelNextStep"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mb-6">
            <div class="text-sm text-gray-600 whitespace-pre-line">{{ validationMessage }}</div>
            
            <!-- Validation Summary -->
            <div class="mt-4 p-3 bg-green-50 rounded-md">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800">
                    All validations passed for this step
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="cancelNextStep"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Review Again
            </button>
            <button
              type="button"
              @click="confirmNextStep"
              class="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Proceed to Next Step
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex justify-between">
        <button
          v-if="currentStep > 0"
          @click="previousStep"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Previous
        </button>
        <div v-else class="w-20"></div>
        
        <button
          v-if="showNextButton"
          @click="attemptNextStep"
          type="button"
          :disabled="isSubmitting"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <template v-if="isSubmitting && currentStep === 3">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </template>
          <template v-else>
            {{ nextButtonText }}
          </template>
        </button>
        <div v-else class="w-20"></div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'

const emit = defineEmits(['submitted', 'cancelled'])

const steps = [
  { title: 'Basic Info' },
  { title: 'Images' },
  { title: 'Date and Time' },
  { title: 'Review' }
]

const currentStep = ref(0)
const showValidationDialog = ref(false)
const validationMessage = ref('')
const formData = ref({
  name: '',
  category: '',
  description: '',
  images: [],
  dateAndTime: ''
})
const errors = ref({})
const availableCategories = ref(['Electronics', 'Clothing', 'Food', 'Books', 'Other'])
const isSubmitting = ref(false)
const showConfirmDialog = ref(false)

const getStepValidationMessage = () => {
  switch (currentStep.value) {
    case 0:
      return `Please confirm the basic information:
• Name: ${formData.value.name}
• Category: ${formData.value.category}
• Description is provided`
    case 1:
      return `Please confirm the uploaded images:
• Number of images: ${formData.value.images.length}
• All images meet size requirements`
    case 2:
      return `Please confirm the schedule:
• Date and Time: ${new Date(formData.value.dateAndTime).toLocaleString()}`
    default:
      return 'Please confirm all information is correct'
  }
}

const validateStep = () => {
  errors.value = {}
  let isValid = true

  switch (currentStep.value) {
    case 0:
      if (!formData.value.name?.trim() || formData.value.name.length < 3) {
        errors.value.name = 'Name is required (minimum 3 characters)'
        isValid = false
      }
      if (!formData.value.category) {
        errors.value.category = 'Category is required'
        isValid = false
      }
      if (!formData.value.description?.trim() || formData.value.description.length < 10) {
        errors.value.description = 'Description is required (minimum 10 characters)'
        isValid = false
      }
      break
    case 1:
      if (formData.value.images.length === 0) {
        errors.value.images = 'At least one image is required'
        isValid = false
      }
      if (formData.value.images.length > 5) {
        errors.value.images = 'Maximum 5 images allowed'
        isValid = false
      }
      break
    case 2:
      if (!formData.value.dateAndTime) {
        errors.value.dateAndTime = 'Date and time is required'
        isValid = false
      }
      break
  }

  return isValid
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  // Validate file types and sizes
  const invalidFiles = files.filter(file => {
    const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    const isValidSize = file.size <= maxSize
    return !isValidType || !isValidSize
  })
  
  if (invalidFiles.length > 0) {
    errors.value.images = 'Please ensure all files are images (PNG, JPG, GIF) and under 10MB.'
    return
  }
  
  // Process valid files
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.value.images.push({
        file: file,
        preview: e.target.result
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  formData.value.images.splice(index, 1)
}

const attemptNextStep = () => {
  if (currentStep.value === steps.length - 1) {
    showConfirmDialog.value = true
    return
  }

  if (validateStep()) {
    confirmNextStep()
  } else {
    showValidationDialog.value = true
  }
}

const confirmNextStep = () => {
  showValidationDialog.value = false
  currentStep.value++
}

const cancelNextStep = () => {
  showValidationDialog.value = false
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const confirmSubmit = async () => {
  try {
    await submitForm()
    showConfirmDialog.value = false
    // Refresh the page after successful submission
    window.location.reload()
  } catch (error) {
    // Error handling is already in submitForm
    showConfirmDialog.value = false
  }
}

const submitForm = async () => {
  if (!validateStep()) return
  
  isSubmitting.value = true
  errors.value = {}
  
  try {
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.value.name)
    formDataToSend.append('category', formData.value.category)
    formDataToSend.append('description', formData.value.description)
    formDataToSend.append('date_and_time', formData.value.dateAndTime)
    
    // Append each image file
    formData.value.images.forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image.file)
    })
    
    const response = await axios.post('/products', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    })
    
    // Don't reset form here since we're going to refresh the page
    return response
    
  } catch (error) {
    if (error.response?.status === 422) {
      // Handle validation errors
      errors.value = error.response.data.errors
    } else {
      errors.value = { 
        general: 'An error occurred while submitting the form. Please try again.' 
      }
    }
    console.error('Form submission error:', error.response?.data || error.message)
    throw error
  } finally {
    isSubmitting.value = false
  }
}

const showNextButton = computed(() => {
  return currentStep.value < steps.length
})

const nextButtonText = computed(() => {
  return currentStep.value === steps.length - 1 ? 'Submit' : 'Next'
})
</script>
