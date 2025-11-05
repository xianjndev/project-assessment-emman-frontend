import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const taskData = ref([])
  const doubleCount = computed(() => count.value * 2)

  //functions
  function increment() {
    count.value++
  }

  async function fetchTasks() {
    try {
      const res = await axios.get('http://task-management-system-laravel.test/api/getTasks', {
        headers: {
          Authorization: 'Bearer 4|4BA6WnhTut5owkyy8Z5ipvrAhwp8ftFtV5k0ao5Ia2f50837',
        },
      })
      return (taskData.value = res.data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  return { count, doubleCount, increment, fetchTasks }
})
