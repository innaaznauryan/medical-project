<template>
  <header class="bg-primary text-white py-4 shadow-md w-full fixed top-0 left-0 z-40">
    <div class="container mx-auto flex justify-between items-center px-6">
      <h1 class="text-3xl font-bold tracking-tight">Welcome</h1>
      <nav class="flex space-x-8">
        <RouterLink
            :to="{ name: 'home' }"
            class="font-medium hover:text-gray-200 transition duration-300"
            :class="{ 'text-gray-200': $route.name === 'home' }"
        >
          Home
        </RouterLink>
        <RouterLink
            :to="{ name: 'doctors' }"
            class="font-medium hover:text-gray-200 transition duration-300"
            :class="{ 'text-gray-200': $route.name === 'doctors' }"
        >
          Doctors
        </RouterLink>
        <RouterLink
            :to="{ name: 'nurses' }"
            class="font-medium hover:text-gray-200 transition duration-300"
            :class="{ 'text-gray-200': $route.name === 'nurses' }"
        >
          Nurses
        </RouterLink>
      </nav>
    </div>
  </header>

  <div class="absolute top-16 left-0 p-8 capitalize">{{ $route.name }}</div>

  <main class="container mx-auto px-6 py-8">
    <RouterView />
  </main>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import employeesData from "./data/employeesData.json";
import departmentsData from "./data/departmentsData.json";

onMounted(() => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(employeesData));
  }
  if (!localStorage.getItem('departments')) {
    localStorage.setItem('departments', JSON.stringify(departmentsData));
  }
})
</script>
