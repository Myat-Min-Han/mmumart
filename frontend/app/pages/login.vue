<template>
    <main class="grid grid-cols-2 h-screen">
    <section class="p-10 bg-primary text-white">
      <h1 class="text-xl font-medium">MMUMART</h1>
      <div class="mt-20">
        <h1 class="font-bold w-140 text-4xl mb-4">Welcome back to the heart of MMU Commerce</h1>
        <p class="opacity-45 mb-10">
          The curated marketplace for Multimedia University students and staff. Buy, sell, and trade with your academic community.
        </p>
      </div>
    </section>
    <section class="flex pt-20 justify-center">
      <div class="w-100">
        <h1 class="text-2xl font-semibold mb-2">Member Log in</h1>
        <p class="opacity-70 mb-5">Enter your credentials to access the marketplace</p>

        <form  class="flex flex-col gap-5 mb-2">
          <div>
            <label class="block text-sm font-medium mb-1">MMU Email</label>
            <div class="relative border border-gray-700  rounded-lg px-3">
              <UIcon name="i-lucide-at-sign" size="md"/>
              <input type="text" class="pr-10 pl-2 py-2 focus:outline-none">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <div class="relative border border-gray-700  rounded-lg px-3">
              <UIcon name="i-lucide-lock" size="md"/>
              <input type="text" class="pr-10 pl-2 py-2 focus:outline-none">
            </div>
          </div>
          <button type="submit" class="w-100 px-3 py-2 text-white bg-primary rounded-lg cursor-pointer">
            Log in
          </button>
        </form>
        <div class="text-center text-sm">
          New to MMUMART?
          <NuxtLink to="/register" class="font-semibold">Create an Account</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>