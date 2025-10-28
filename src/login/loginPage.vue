<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-5">
        Don’t have an account?
        <router-link to="/register" class="text-blue-600 hover:underline">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  // Example placeholder authentication logic
  if (email.value === 'admin@example.com' && password.value === '123456') {
    alert('Login successful!')
    // Example redirect
    // router.push('/dashboard')
  } else {
    alert('Invalid email or password.')
  }
}
</script>
