<script setup>
const categories = [
  { name: 'All', count: 120 },
  { name: 'Textbooks', count: 45 },
  { name: 'Electronics', count: 28 },
  { name: 'Campus Gear', count: 15 },
  { name: 'Stationary', count: 32 }
]

const selectedCategories = ref(['All'])
const sortBy = ref('Newest')
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popularity']

const minPrice = ref(0)
const maxPrice = ref(1000)

const { data: products, pending, error } = useAsyncData('products', () =>
  $fetch('http://localhost:5002/api/items', {
    headers: {
      Authorization: `Bearer ${useAuth().token.value}`
    }
  })
)
const toggleCategory = (categoryName) => {
  if (categoryName === 'All') {
    selectedCategories.value = ['All']
  } else {
    const index = selectedCategories.value.indexOf('All')
    if (index > -1) {
      selectedCategories.value.splice(index, 1)
    }

    const catIndex = selectedCategories.value.indexOf(categoryName)
    if (catIndex > -1) {
      selectedCategories.value.splice(catIndex, 1)
      if (selectedCategories.value.length === 0) {
        selectedCategories.value = ['All']
      }
    } else {
      selectedCategories.value.push(categoryName)
    }
  }
}
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
    <section class="mb-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-primary mb-2">Campus Marketplace</h1>
          <p class="text-gray-600">Find the curated academic resources and student essentials within your campus community</p>
        </div>
        <div class="flex items-center gap-2" v-if="Array.isArray(products) && products.length > 0">
          <span class="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
          <select v-model="sortBy" class="text-sm border-none bg-transparent font-medium focus:ring-0 cursor-pointer">
            <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
    </section>

    <section class="flex flex-col md:flex-row gap-8">
      <aside class="w-full md:w-64 shrink-0" v-if="Array.isArray(products) && products.length > 0">
        <!-- Categories -->
        <div class="space-y-8 sticky top-8">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-primary">Categories</h3>
              <button @click="selectedCategories = ['All']" class="text-xs text-primary hover:underline">Reset</button>
            </div>
            <div class="space-y-3">
              <div v-for="category in categories" :key="category.name" class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    :checked="selectedCategories.includes(category.name)"
                    @change="toggleCategory(category.name)"
                    class="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  >
                  <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors" :class="{'text-gray-900 font-medium': selectedCategories.includes(category.name)}">
                    {{ category.name }}
                  </span>
                </label>
                <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {{ category.count }}
                </span>
              </div>
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <h3 class="text-lg font-semibold text-primary mb-4">Price Range</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Min (RM)</label>
                  <input 
                    type="number" 
                    v-model="minPrice"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-gray-500 mb-1">Max (RM)</label>
                  <input 
                    type="number" 
                    v-model="maxPrice"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                </div>
              </div>
              <div class="pt-2">
                <button class="w-full bg-primary text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm">
                  Apply Price Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-1">
        <div v-if="pending" class="text-center text-gray-500">Loading products...</div>
        <div v-else-if="error" class="text-center text-red-500">Failed to load products</div>
        <div v-else-if="!products || products.length === 0" class="text-center text-gray-500">
            No products available
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="product in products" :key="product.id" :to="`/products/${product.id}`" class="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div class="relative aspect-square overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <div class="absolute top-2 right-2">
                <span class="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
                  {{ product.condition }}
                </span>
              </div>
            </div>
            <div class="p-4">
              <div class="text-xs text-primary font-medium mb-1">{{ product.category }}</div>
              <h3 class="text-sm font-semibold mb-2 line-clamp-2 min-h-10">{{ product.name }}</h3>
              <div class="flex items-center justify-between mt-auto">
                <span class="text-lg font-bold text-primary">RM{{ product.price.toFixed(2) }}</span>
                <button class="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-primary hover:text-white transition-colors">
                  <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
