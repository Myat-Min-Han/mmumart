<script setup>
import { ref } from 'vue'

const form = ref({
  title: "",
  price: 0,
  category: "",
  description: "",
  images: []
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-6">

    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Create Listing</h1>
      <p class="text-sm text-gray-500">Fill in the details to publish your item</p>
    </div>

    <!-- MAIN GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- LEFT: FORM -->
      <div class="bg-white shadow-sm border rounded-xl p-6 space-y-5">

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Price + Category -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Price (RM)
            </label>
            <input
              v-model="form.price"
              type="number"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              v-model="form.category"
              class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option disabled value="">Select category</option>
              <option>Textbooks</option>
              <option>Electronics</option>
              <option>Services</option>
              <option>Campus Gear</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <!-- Submit -->
        <button
          class="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Publish Listing
        </button>

      </div>

      <!-- RIGHT: IMAGE UPLOAD -->
      <div class="bg-white shadow-sm border rounded-xl p-6">

        <label class="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>

        <div
          class="border-2 border-dashed rounded-xl p-10 text-center hover:border-primary cursor-pointer"
        >
          <p class="text-sm text-gray-500">
            Drag & drop images here or click to upload
          </p>
          <input type="file" multiple class="hidden" />
        </div>

      </div>

    </div>
  </div>
</template>