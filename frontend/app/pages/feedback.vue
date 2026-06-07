<script setup>
  const submitted = ref(false)

  const form = ref({
    type: '',
    title: '',
    description: ''
  })

  const submitFeedback = () => {
    console.log(form)

    submitted.value = true

    setTimeout(() => {
      submitted.value = false
    }, 3000)
  }
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="w-full max-w-lg bg-white rounded-3xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Feedback</h1>
      <p class="text-gray-500 text-center mb-8">
        Submit bugs or improvement suggestions.
      </p>

      <form @submit.prevent="submitFeedback" class="space-y-5">
        <div>
          <label class="block mb-2 font-medium">Type</label>

          <select
            v-model="form.type"
            class="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option disabled value="">Select type</option>
            <option>Bug Report</option>
            <option>Improvement Suggestion</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 font-medium">Title</label>

          <input
            v-model="form.title"
            type="text"
            placeholder="Short title"
            class="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label class="block mb-2 font-medium">Description</label>

          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Describe the issue or suggestion"
            class="w-full border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>

      <div
        v-if="submitted"
        class="mt-5 bg-green-100 text-green-700 px-4 py-3 rounded-2xl"
      >
        Feedback submitted successfully.
      </div>
    </div>
  </div>
</template>
