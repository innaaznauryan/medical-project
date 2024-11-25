import { createRouter, createWebHistory } from "vue-router";

const Home = () => import('../views/Home.vue');
const Doctors = () => import('../views/Doctors.vue');
const Nurses = () => import('../views/Nurses.vue');
const CardiologyDepartment = () => import('../views/CardiologyDepartment.vue');
const SurgicalDepartment = () => import('../views/SurgicalDepartment.vue');

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/doctors',
        name: 'doctors',
        component: Doctors
    },
    {
        path: '/nurses',
        name: 'nurses',
        component: Nurses
    },
    {
        path: '/cardiology',
        name: 'cardiology',
        component: CardiologyDepartment
    },
    {
        path: '/surgical',
        name: 'surgical',
        component: SurgicalDepartment
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})