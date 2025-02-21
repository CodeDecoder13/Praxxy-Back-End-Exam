<script setup>
import { ref } from 'vue';
import Sidebar from '@/Components/Sidebar.vue';
import { Link } from '@inertiajs/vue3';
import { Menu, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';

const isSidebarOpen = ref(true);
const isSidebarMinimized = ref(false);

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleMinimize = () => {
    isSidebarMinimized.value = !isSidebarMinimized.value;
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex">
        <Sidebar :is-open="isSidebarOpen" :is-minimized="isSidebarMinimized" @toggle="toggleSidebar" />
        
        <div class="flex-1 flex flex-col transition-all duration-300 ease-in-out"
             :class="{ 'lg:ml-64': isSidebarOpen && !isSidebarMinimized, 'lg:ml-20': isSidebarMinimized }">
            <!-- Page Heading -->
            <header class="bg-white shadow flex items-center" v-if="$slots.header">
                <button @click="toggleMinimize" class="p-4 focus:outline-none">
                    <ChevronsLeft v-if="!isSidebarMinimized" class="h-6 w-6" />
                    <ChevronsRight v-else class="h-6 w-6" />
                </button>
                <div class="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <main class="flex-1 py-2 px-2 sm:px-4 lg:px-6">
                <div class="max-w-full">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

