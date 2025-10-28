<template>
  <div v-if="$route.path !== '/login'" class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md flex items-center justify-between px-6 py-3">
      <!-- Logo / Title -->
      <div class="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"
          />
        </svg>
        <h1 class="text-xl font-semibold text-gray-800">Task Management System</h1>
      </div>

      <!-- User Profile / Actions -->
      <div class="flex items-center space-x-2">
        <h1 class="text-lg font-semibold text-gray-800">User</h1>
        <img src="https://i.pravatar.cc/40" alt="User Avatar" class="w-8 h-8 rounded-full border" />
        <button class="rounded-lg hover:bg-sky-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </header>
    <!-- Main Content -->

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
        <h2 class="text-xl font-semibold mb-4 text-gray-800">ADD TASK</h2>

        <form class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="taskObj.title"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter title"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="taskObj.description"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter description"
            ></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="taskObj.status"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option
                v-for="status in statusData"
                :key="status.value"
                :value="status.value"
                :class="status.color"
              >
                {{ status.label }}
              </option>
            </select>
          </div>

          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              v-model="taskObj.priority"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option
                v-for="option in priorities"
                :key="option.value"
                :value="option.value"
                :class="option.color"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </form>

        <!-- Footer buttons -->
        <div class="flex justify-end gap-2 mt-2">
          <button
            @click="showModal = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            @click="saveTask"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    <!-- <add-modal /> -->
    <main class="p-4">
      <div class="flex flex-row items-end justify-end w-full pt-4">
        <button
          class="bg-green-500 text-white rounded-full p-2 shadow transition hover:bg-green-600"
          title="ADD TASK"
          @click="showModal = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <table class="min-w-full divide-y divide-slate-100">
        <thead class="bg-slate-50">
          <tr>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider"
              v-for="header in tableHeader"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody id="tableBody" class="bg-white divide-y divide-slate-100">
          <tr class="text-center" v-for="task in tasks">
            <td class="whitespace-nowrap">
              <div class="text-sm font-medium text-center">
                {{ task.title }}
              </div>
            </td>
            <td class="whitespace-nowrap">
              <div class="text-sm font-medium text-center">
                {{ task.description }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span :class="isCompleted(task.status)">{{ task.statusLabel }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <span :class="priorityLevel(task.priority)">{{ task.priority }}</span>
            </td>
            <td class="whitespace-nowrap text-center text-sm font-medium">
              <button class="text-red-500 rounded-full transition" title="DELETE">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <!-- <div class="tasks-container">
      <h2>My Tasks</h2>
      <draggable v-model="fruits" item-key="id" :animation="150" handle=".handle" @end="onDragEnd">
        <template #item="{ element }">
          <div class="task-item" :data-id="element.id">
            <span class="handle" style="cursor: grab; margin-right: 0.5rem">☰</span>
            <div class="task-main">
              <div class="task-title">{{ element.prutas }}</div>
              <div class="task-meta">#{{ element.id }}</div>
            </div>s
          </div>
        </template>
      </draggable>
    </div> -->

    <!-- Footer (optional) -->
    <footer class="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">© 2025</footer>
  </div>
  <RouterView v-else />
</template>

<script setup>
import { computed, ref, watch, reactive } from 'vue'
import draggable from 'vuedraggable'
import axios from 'axios'
import { getCurrentInstance } from 'vue'
// import AddModal from './Modal/AddModal.vue'

const tasks = ref([])
const taskObj = reactive({})
const showModal = ref(false)
const refetchFlag = ref(false)
const { proxy } = getCurrentInstance()

function isCompleted(status) {
  if (status == '1') {
    return 'inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800'
  }
  return 'inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-emerald-800'
}

function priorityLevel(type) {
  if (type.toLowerCase() == 'low') {
    return 'inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-[#22C55E] text-emerald-800'
  } else if (type == 'medium') {
    return 'inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FACC15] text-emerald-800'
  }
  return 'inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EF4444] text-emerald-800'
}

const priorities = ref([
  { value: '', label: 'Select priority', color: 'text-gray-400' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
])

const statusData = ref([
  { value: '', label: 'Select status', color: 'text-gray-400' },
  { value: 0, label: 'Pending' },
  { value: 1, label: 'Completed' },
])

async function saveTask() {
  taskObj.user_id = 4
  taskObj.isCompleted = taskObj.status

  proxy.$swal
    .fire({
      title: 'Do you want to save the task?',
      showDenyButton: true,
      confirmButtonText: 'Save',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post(
          'http://task-management-system-laravel.test/api/storeTask',
          taskObj,
          {
            headers: {
              Authorization: 'Bearer 2|xfliIhJQiAcrNtFS0BI0opPA7Q2gule1jFIEU3IN32daeb2c',
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        if (res.data.status) {
          proxy.$swal.fire('Saved!', '', 'success')
          refetchFlag.value = !refetchFlag.value
          showModal.value = false
          console.log(res.data, 'res sa save')
        } else {
          proxy.$swal.fire({
            icon: 'error',
            title: 'Not saved!',
            text: 'Something went wrong!',
          })
        }
      }
    })
}

async function getData() {
  // const res = await axios.get('http://task-management-system-laravel.test/api/getTasks')
  // console.log(res, 'resresresresteeee')
  // tasks.value = res.data
  const res = await axios.get('http://task-management-system-laravel.test/api/getTasks', {
    headers: {
      Authorization: 'Bearer 2|xfliIhJQiAcrNtFS0BI0opPA7Q2gule1jFIEU3IN32daeb2c',
    },
  })
  console.log(res, 'resresresresteeee')
  tasks.value = res.data
}

getData()

watch(refetchFlag, () => {
  getData()
})

const tableHeader = ref(['TITLE', 'description', 'STATUS', 'PRIORITY', 'ACTION'])
const fruits = ref([
  { id: 1, prutas: 'banana' },
  { id: 2, prutas: 'manga' },
  { id: 3, prutas: 'orinch' },
  { id: 4, prutas: 'apul' },
])

const user = computed(() => (counterUser = 0))

function onDragEnd(evt) {
  console.log('New order:', fruits.value)
}

function test() {
  alert('working be')
}
</script>

<style scoped>
.tasks-container {
  max-width: 640px;
  margin: 0 auto;
}
.task-item {
  display: flex;
  align-items: center;
  padding: 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  background: white;
}
.task-main {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
