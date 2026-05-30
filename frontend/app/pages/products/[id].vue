<script setup>
const route = useRoute();
const productId = parseInt(route.params.id, 10);

// later fetch product details from API using productId

const product = {
    id: 7,
    name: 'Waterproof Laptop Backpack',
    price: 55.00,
    category: 'Campus Gear',
    image: '/img/campus_gear_2.png',
    condition: 'Like New',
    description: 'Waterproof laptop backpack with dedicated 15-inch compartment and plenty of pockets for accessories.',
    seller: {
        name: 'Jordan Lee',
        avatar: 'https://i.pravatar.cc/150?u=jordan',
        rating: 5.0,
        joined: 'Feb 2024'
    }
}
</script>

<template>
    <main v-if="product" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumbs -->
        <nav class="flex mb-8 text-sm text-gray-500">
            <NuxtLink to="/products" class="hover:text-primary transition-colors">Products</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900">{{ product.category }}</span>
        </nav>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Left Side: Image -->
            <div class="space-y-4">
                <div class="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                </div>
            </div>

            <!-- Right Side: Details -->
            <div class="flex flex-col">
                <div class="mb-6">
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
                        {{ product.condition }}
                    </span>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
                    <p class="text-xl font-bold text-primary">${{ product.price.toFixed(2) }}</p>
                </div>

                <div class="border-t border-b border-gray-100 py-6 mb-6">
                    <h3 class="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        {{ product.description }}
                    </p>
                </div>

                <!-- Seller Info -->
                <div class="bg-gray-50 rounded-xl p-5 mb-8">
                    <h3 class="text-sm font-semibold text-gray-900 mb-4">Seller Information</h3>
                    <div class="flex items-center gap-4">
                        <img :src="product.seller.avatar" :alt="product.seller.name" class="w-12 h-12 rounded-full border border-gray-200">
                        <div>
                            <p class="text-sm font-medium text-gray-900">{{ product.seller.name }}</p>
                            <div class="flex items-center gap-2 mt-0.5">
                                <div class="flex items-center text-yellow-400">
                                    <UIcon name="i-heroicons-star-20-solid" class="w-4 h-4" />
                                    <span class="text-xs text-gray-600 ml-1">{{ product.seller.rating }}</span>
                                </div>
                                <span class="text-gray-300">•</span>
                                <p class="text-xs text-gray-500">Joined {{ product.seller.joined }}</p>
                            </div>
                        </div>
                        <button class="ml-auto text-xs font-semibold text-primary hover:underline">View Profile</button>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-4 flex-col mt-auto">
                        <button class="flex-1 bg-primary text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-sm">
                            Buy Now
                        </button>
                        <button class="flex-1 bg-primary/50 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-sm">
                            Contact Seller
                        </button>
                </div>
            </div>
        </div>
    </main>

    <main v-else class="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 class="text-xl font-semibold text-gray-900">Product not found</h1>
        <NuxtLink to="/products" class="mt-4 inline-block text-primary hover:underline">Back to marketplace</NuxtLink>
    </main>
</template>
