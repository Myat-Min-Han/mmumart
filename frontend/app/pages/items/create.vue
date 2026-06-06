<script setup>
import { ref } from 'vue'

const form = ref({
  title: "",
  price: null,
  category: "",
  description: "",
  condition: "",
  location: "",
  image: null
})

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.image = {
      file,
      url: e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  form.value.image = null
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 lg:p-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary">Create New Listing</h1>
      <p class="text-gray-500">Reach thousands of students by listing your item today</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <!-- LEFT: IMAGE UPLOAD (Column 1-5) -->
      <div class="lg:col-span-5 space-y-4">
        <label class="block text-sm font-semibold text-gray-700">
          Item Image
        </label>
        
        <div
          @click="triggerFileInput"
          class="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50 flex flex-col items-center justify-center min-h-100 relative overflow-hidden group"
        >
          <div v-if="!form.image" class="flex flex-col items-center">
            <div class="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p class="text-lg font-medium text-primary">Upload Image</p>
            <p class="text-sm text-gray-500 mt-1">
              Drag & drop or click to browse
            </p>
            <p class="text-xs text-gray-400 mt-4">
              Supports: JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
          
          <!-- Image Preview -->
          <div v-else class="w-full h-full absolute inset-0">
            <img :src="form.image.url" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-y-3">
               <button 
                 @click.stop="triggerFileInput"
                 class="text-white font-medium bg-primary px-6 py-2 rounded-full hover:scale-105 transition-transform"
               >
                 Change Image
               </button>
               <button 
                 @click.stop="removeImage"
                 class="text-white font-medium bg-red-600 px-6 py-2 rounded-full hover:scale-105 transition-transform"
               >
                 Remove
               </button>
            </div>
          </div>

          <input 
            ref="fileInput"
            type="file" 
            accept="image/*"
            class="hidden" 
            @change="handleFileUpload"
          />
        </div>
        
        <p class="text-xs text-gray-500">
          Tip: Use a clear, well-lit photo of your item to attract more buyers.
        </p>
      </div>

      <!-- RIGHT: FORM (Column 6-12) -->
      <div class="lg:col-span-7 bg-white shadow-sm border border-gray-100 rounded-2xl p-8 space-y-6">
        
        <!-- Title -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Listing Title
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. Calculus Early Transcendentals 8th Edition"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <!-- Category + Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              v-model="form.category"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
            >
              <option disabled value="">Select category</option>
              <option>Textbooks</option>
              <option>Electronics</option>
              <option>Services</option>
              <option>Campus Gear</option>
              <option>Stationary</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Price (RM)
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">RM</span>
              <input
                v-model="form.price"
                type="number"
                class="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <!-- Condition + Pickup Location -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Condition
            </label>
            <select
              v-model="form.condition"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white"
            >
              <option disabled value="">Select condition</option>
              <option>New</option>
              <option>Used - Like New</option>
              <option>Used - Good</option>
              <option>Used - Fair</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Pickup Location
            </label>
            <input
              v-model="form.location"
              type="text"
              placeholder="e.g. Cyberjaya Campus, Block A"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Describe what you are selling. Include details like age, defects, or features."
            class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        </div>

        <!-- Submit -->
        <div class="pt-4">
          <button
            class="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            Publish Listing
          </button>
          <p class="text-center text-xs text-gray-500 mt-4">
            By publishing, you agree to our Terms of Service and Community Guidelines.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>