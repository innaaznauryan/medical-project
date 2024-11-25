<template>
  <EmployeesContainer
      :employees="employees"
      :can-edit="true"
      @open-edit-modal="openEditModal"
      @open-delete-modal="openDeleteModal"
  />
  <button
    class="btn"
    @click="openModal"
  >
    Add Nurse
  </button>
  <Modal
    title="Add Nurse"
    :show="isModalOpen"
    @close="closeModal"
  >
    <EmployeeForm
      :selected-employee="selectedEmployee"
      :is-edit-mode="isEditMode"
      @close="closeModal"
      @submit-form="submitForm"
    />
  </Modal>
  <Modal
      :show="isDeleteModalOpen"
      title="Are you sure you want to delete this Employee?"
      @close="closeDeleteModal"
  >
    <ConfirmDelete
      v-if="selectedEmployee"
      :selected-employee="selectedEmployee"
      @close="closeDeleteModal"
      @confirm="deleteEmployee"
    />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { Position } from "../constants/positions.ts";
import { EmployeeSchema, NewEmployeeSchema } from "../types/employee.ts";
import EmployeesContainer from "../components/EmployeesContainer.vue";
import Modal from "../components/Modal.vue";
import EmployeeForm from "../components/EmployeeForm.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";

const store = useStore();
const employees = computed(() => store.state.employees
  .filter((employee: EmployeeSchema) => employee.position === Position.nurse));

const isModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const selectedEmployee = ref<EmployeeSchema | null>(null);
const isEditMode = ref<boolean>(false);

const openModal = () => {
  isModalOpen.value = true;
  isEditMode.value = false;
  selectedEmployee.value = null;
}
const closeModal = () => {
  isModalOpen.value = false;
  selectedEmployee.value = null;
};
const openEditModal = (employee: EmployeeSchema) => {
  selectedEmployee.value = employee;
  isModalOpen.value = true;
  isEditMode.value = true;
}
const openDeleteModal = (employee: EmployeeSchema) => {
  selectedEmployee.value = employee;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedEmployee.value = null;
}

const submitForm = (employee: EmployeeSchema) => {
  if (isEditMode.value) {
    updateEmployee(employee);
  } else {
    createEmployee(employee);
  }
  closeModal();
};
const createEmployee = (newEmployee: NewEmployeeSchema) => {
  const uniqueId = Date.now();
  store.dispatch('createEmployee', {
    ...newEmployee,
    id: uniqueId,
    position: Position.nurse
  });
};
const updateEmployee = (updatedEmployee: EmployeeSchema) => {
  store.dispatch('updateEmployee', updatedEmployee);
};
const deleteEmployee = () => {
  if (selectedEmployee.value && selectedEmployee.value.id) {
    store.dispatch('deleteEmployee', selectedEmployee.value.id);
  }
  closeDeleteModal();
};
</script>