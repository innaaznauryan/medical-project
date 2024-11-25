import { createStore } from 'vuex';
import employeesData from "../data/employeesData.json";
import { EmployeeSchema } from "../types/employee.ts";

interface State {
    employees: EmployeeSchema[];
}

export const store = createStore<State>({
    state() {
        const storedEmployees = localStorage.getItem('employees');
        return {
            employees: storedEmployees ? JSON.parse(storedEmployees) : employeesData,
        };
    },
    mutations: {
        createEmployee(state: State, newEmployee: EmployeeSchema) {
            state.employees.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
        updateEmployee(state: State, updatedEmployee: EmployeeSchema) {
            state.employees = state.employees.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            );
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
        deleteEmployee(state: State, employeeId: number) {
            state.employees = state.employees.filter((employee) => employee.id !== employeeId);
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
    },
    actions: {
        createEmployee({ commit }, newEmployee: EmployeeSchema) {
            commit('createEmployee', newEmployee);
        },
        updateEmployee({ commit }, updatedEmployee: EmployeeSchema) {
            commit('updateEmployee', updatedEmployee);
        },
        deleteEmployee({ commit }, employeeId: number) {
            commit('deleteEmployee', employeeId);
        },
    },
});
