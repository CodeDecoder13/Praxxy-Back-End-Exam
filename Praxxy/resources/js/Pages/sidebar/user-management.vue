<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import Sidebar from '@/Components/Sidebar.vue';

const isOpen = ref(true);
const isMinimized = ref(false);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <Head title="User Management" />

    <AuthenticatedLayout>
        <div class="flex">
            <Sidebar :isOpen="isOpen" :isMinimized="isMinimized" @toggle="toggleSidebar" />
            
            <div class="flex-1 p-8">
                <h1 class="text-2xl font-bold mb-6">Use Management</h1>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <p class="text-red-600">
                        Debug: There is no content showing in the user page.
                        Please implement the user management functionality.
                    </p>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
