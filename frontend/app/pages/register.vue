<script setup>
</script>

<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-10 bg-primary text-white">
      <h1 class="text-xl font-medium">MMUMART</h1>
      <div class="mt-20">
        <h1 class="font-bold w-140 text-4xl mb-4">The curated marketplace for students</h1>
        <p class="opacity-45 mb-10">
          Join the exclusive campus ecosystem where trust is built-in and commerce is effortless.
        </p>
        <div class="flex items-center gap-4 mb-5">
          <UIcon name="i-lucide-shield-check" class="size-5" />
          <span class="flex flex-col gap-1">
            <h1 class="font-semibold text-md">Safe campus hand-offs</h1>
            <p class="opacity-45">Meet verified peers at designated campus zones for total peace of mind.</p>
          </span>
        </div>
        <div class="flex items-center gap-4">
          <UIcon name="i-lucide-users-round" class="size-5" />
          <span class="flex flex-col gap-1">
            <h1 class="font-semibold text-md">Student only community</h1>
            <p class="opacity-45">No external noise. Just MMU students and staff buying and selling.</p>
          </span>
        </div>
      </div>
    </section>
    <section class="flex pt-20 justify-center">
      <div class="w-100">
        <h1 class="text-2xl font-semibold mb-2">Create your account</h1>
        <p class="opacity-70 mb-5">Get started with your academic emaill address</p>

        <form  class="flex flex-col gap-5 mb-2">
          <div>
            <label class="block text-sm font-medium mb-1">Full Name</label>
            <div class="relative border border-gray-700  rounded-lg px-3">
              <UIcon name="i-lucide-user" size="md"/>
              <input type="text" class="pr-10 pl-2 py-2 focus:outline-none">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">MMU Student/Staff Email</label>
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
            Create Account
          </button>
        </form>
        <div class="text-center text-sm">
          Already have an account? 
          <NuxtLink to="/login" class="font-semibold">Log in</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>