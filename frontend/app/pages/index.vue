<template>
  <div class="max-w-300 mx-auto px-4">

    <!-- Navbar -->
    <div class="flex justify-between items-center py-4">
      <div class="text-xl font-bold">{{ siteName }}</div>

      <div class="flex gap-4">
        <a
          v-for="link in navLinks"
          :key="link"
          class="text-gray-700 hover:text-blue-600 cursor-pointer"
        >
          {{ link }}
        </a>
      </div>

      <input
        v-model="searchText"
        type="text"
        placeholder="Search..."
        class="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <!-- Hero -->
    <div class="bg-blue-900 text-white p-10 rounded-xl mt-4">
      <h1 class="text-3xl font-bold mb-2">{{ heroTitle }}</h1>
      <p class="mb-4">{{ heroSubtitle }}</p>

      <button class="bg-white text-blue-900 px-4 py-2 rounded mr-2">
        {{ heroBtn1 }}
      </button>

      <button class="bg-blue-700 px-4 py-2 rounded">
        {{ heroBtn2 }}
      </button>
    </div>

    <!-- Categories -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">{{ categoryTitle }}</h2>

      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="cat in categories"
          :key="cat"
          class="bg-white p-4 rounded-lg shadow text-center hover:shadow-md"
        >
          {{ cat }}
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">{{ featuredTitle }}</h2>

      <div class="flex gap-4">
        <div
          v-for="item in products"
          :key="item.name"
          class="bg-white p-4 rounded-lg shadow w-48"
        >
          <p class="font-medium">{{ item.name }}</p>
          <p class="text-gray-600">{{ item.price }}</p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-2">{{ ctaTitle }}</h2>
      <p class="text-gray-600 mb-4">{{ ctaText }}</p>

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ ctaButton }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const siteName = ref('MMUMART')

const navLinks = ref(['Textbooks', 'Electronics', 'Services', 'Campus Gear'])
const searchText = ref('')

const heroTitle = ref('Discover Quality Campus Essentials.')
const heroSubtitle = ref('Buy, sell, and trade academic materials.')
const heroBtn1 = ref('Start Exploring')
const heroBtn2 = ref('Become a Seller')

const categoryTitle = ref('Academic Categories')
const categories = ref(['Textbooks', 'Electronics', 'Services', 'Campus Gear'])

const featuredTitle = ref('Featured Picks')
const products = ref([
  { name: 'Calculator', price: 'RM 145.00' },
  { name: 'Keyboard', price: 'RM 210.00' },
  { name: 'Notebook', price: 'RM 45.00' }
])

const ctaTitle = ref('Your unused gear could help others')
const ctaText = ref('Turn materials into funds.')
const ctaButton = ref('Post Your First Listing')
</script>