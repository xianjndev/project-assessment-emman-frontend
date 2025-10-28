<template>
  <div class="p-6">
    <!-- Button to open modal -->
    <button
      @click="showModal = true"
      class="px-4 py-2 bg-pink-600 text-yellow-400 rounded-lg hover:bg-blue-700"
    >
      Open Modal
    </button>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <!-- Close button -->
          <button
            @click="showModal = false"
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>

          <!-- Modal content -->
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Modal Title</h2>

          <p class="text-gray-600 mb-6">
            This is a simple Tailwind modal placed directly in your Vue file.
          </p>

          <!-- Footer buttons -->
          <div class="flex justify-end gap-2">
            <button
              @click="showModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// reactive variable to show/hide modal
const showModal = ref(false)

// optional confirmation action
const confirmAction = () => {
  alert('Action confirmed!')
  showModal.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity:  0;
}
</style>
