<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, BarChart2, InfoIcon } from 'lucide-vue-next';
import ChartComponent from '@/Components/ChartComponent.vue';
</script>

<template>
    <Head title="Video Management" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-black">
                Video Management
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-8 flex items-center">
                    <BarChart2 class="w-8 h-8 mr-3 text-gray-700" />
                    <h3 class="text-2xl font-bold text-gray-800">Product Overview</h3>
                </div>

                
            </div>
        </div>
    </AuthenticatedLayout>
</template>
