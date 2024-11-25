<template>
  <EmployeesContainer :employees="employees" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from 'vuex';
import { Department } from "../constants/departments.ts";
import { EmployeeSchema } from "../types/employee.ts";
import EmployeesContainer from "../components/EmployeesContainer.vue";

const store = useStore();
const employees = computed(() => store.state.employees
    .filter((employee: EmployeeSchema) => employee.departmentId === Department.cardiology)
    .sort((a: EmployeeSchema, b: EmployeeSchema) => (b.isHead ? 1 : 0) - (a.isHead ? 1 : 0)));
</script>