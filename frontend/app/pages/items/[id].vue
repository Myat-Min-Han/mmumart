<script setup>
const route = useRoute();
const { token, user } = useAuth();

const productId = computed(() => Number(route.params.id));
const addingToCart = ref(false);
const startingChat = ref(false);
const cartMessage = ref('');
const chatMessage = ref('');

const { data: product, pending, error } = await useAsyncData(
  () => `item-${productId.value}`,
  () =>
    $fetch(`http://localhost:5002/api/items/${productId.value}`, {
      headers: {
        Authorization: `Bearer ${token.value || ''}`,
      },
    }),
  {
    watch: [productId],
    server: false,
  }
);

const addToCart = async () => {
  if (!product.value?.id) return;

  addingToCart.value = true;
  cartMessage.value = '';

  try {
    await $fetch('http://localhost:5002/api/items/cart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value || ''}`,
      },
      body: {
        itemId: product.value.id,
        quantity: 1,
      },
    });

    cartMessage.value = 'Added to cart successfully';
  } catch (err) {
    cartMessage.value = err?.data?.message || 'Failed to add item to cart';
  } finally {
    addingToCart.value = false;
  }
};

const contactSeller = async () => {
  if (!token.value) {
    navigateTo('/auth/login')
    return
  }

  if (!product.value?.id) return

  startingChat.value = true
  chatMessage.value = ''

  try {
    const conversation = await $fetch('http://localhost:5002/api/chats/conversations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        itemId: product.value.id,
      },
    })

    navigateTo(`/chat/${conversation.id}`)
  } catch (err) {
    chatMessage.value = err?.data?.message || err?.data?.error || err.message || 'Unable to start chat'
  } finally {
    startingChat.value = false
  }
};
</script>

<template>
  <main v-if="pending" class="mx-auto max-w-7xl px-4 py-20 text-center text-gray-500">
    Loading item...
  </main>

  <main v-else-if="error" class="mx-auto max-w-7xl px-4 py-20 text-center">
    <h1 class="text-xl font-semibold text-gray-900">Unable to load this item</h1>
    <NuxtLink to="/items" class="mt-4 inline-block text-primary hover:underline">Back to marketplace</NuxtLink>
  </main>

  <main v-else-if="product" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <nav class="flex mb-8 text-sm text-gray-500">
      <NuxtLink to="/items" class="hover:text-primary transition-colors">Marketplace</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-900">{{ product.category || 'Item' }}</span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div class="space-y-4">
        <div class="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <img
            :src="product.imageUrl || '/img/placeholder.png'"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <div class="mb-6">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary uppercase tracking-wider mb-3">
            {{ product.condition || 'Available' }}
          </span>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ product.name || product.title }}</h1>
          <p class="text-xl font-bold text-primary">RM{{ Number(product.price || 0).toFixed(2) }}</p>
        </div>

        <div class="border-t border-b border-gray-100 py-6 mb-6">
          <h3 class="text-sm font-semibold text-gray-900 mb-2">Description</h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ product.description || 'No description provided yet.' }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-5 mb-8 space-y-3 text-sm text-gray-700">
          <div class="flex justify-between">
            <span class="font-medium">Category</span>
            <span>{{ product.category || 'Uncategorized' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Quantity</span>
            <span>{{ product.quantity || 1 }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Pickup location</span>
            <span>{{ product.pickupLocation || 'Not provided' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Seller</span>
            <span>{{ product.seller?.name || 'Not available' }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mt-auto">
          <button
            class="flex-1 bg-primary text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-60"
            :disabled="addingToCart"
            @click="addToCart"
          >
            {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
          </button>
          <button
            class="flex-1 bg-primary/50 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-60"
            :disabled="startingChat || product.userId === user?.id"
            @click="contactSeller"
          >
            {{ startingChat ? 'Opening...' : 'Contact Seller' }}
          </button>
        </div>

        <p v-if="cartMessage" class="mt-3 text-sm" :class="cartMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'">
          {{ cartMessage }}
        </p>
        <p v-if="chatMessage" class="mt-3 text-sm text-red-600">
          {{ chatMessage }}
        </p>
      </div>
    </div>
  </main>

  <main v-else class="mx-auto max-w-7xl px-4 py-20 text-center">
    <h1 class="text-xl font-semibold text-gray-900">Item not found</h1>
    <NuxtLink to="/items" class="mt-4 inline-block text-primary hover:underline">Back to marketplace</NuxtLink>
  </main>
</template>
