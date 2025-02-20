<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ShoppingBag, Users, UserPlus, Eye, BarChart2, InfoIcon } from 'lucide-vue-next';
</script>


<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-black ">
                Admin Dashboard
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-8 flex items-center">
                    <BarChart2 class="w-8 h-8 mr-3 text-gray-700" />
                    <h3 class="text-2xl font-bold text-gray-800">Dashboard Overview</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Card 1 -->
                    <div class="bg-blue-500 text-white p-6 h-40 rounded-lg shadow-lg flex flex-col justify-between lg:col-span-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-3xl font-bold mb-2">150</div>
                                <div class="text-lg">Product Number</div>
                            </div>
                            <ShoppingBag class="w-12 h-12 opacity-50" />
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button class="flex items-center bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded hover:bg-opacity-30 transition-colors duration-300">
                                <InfoIcon class="w-4 h-4 mr-2" />
                                More info
                            </button>
                        </div>
                    </div>
                    
                    <!-- Card 2 -->
                    <div class="bg-green-500 text-white p-6 h-40 rounded-lg shadow-lg flex flex-col justify-between lg:col-span-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-3xl font-bold mb-2">53</div>
                                <div class="text-lg">Number of users</div>
                            </div>
                            <Users class="w-12 h-12 opacity-50" />
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button class="flex items-center bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded hover:bg-opacity-30 transition-colors duration-300">
                                <InfoIcon class="w-4 h-4 mr-2" />
                                More info
                            </button>
                        </div>
                    </div>
                    
                    <!-- Card 3 -->
                    <div class="bg-yellow-500 text-white p-6 h-40 rounded-lg shadow-lg flex flex-col justify-between lg:col-span-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-3xl font-bold mb-2">44</div>
                                <div class="text-lg">User Registrations</div>
                            </div>
                            <UserPlus class="w-12 h-12 opacity-50" />
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button class="flex items-center bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded hover:bg-opacity-30 transition-colors duration-300">
                                <InfoIcon class="w-4 h-4 mr-2" />
                                More info
                            </button>
                        </div>
                    </div>
                    
                    <!-- Card 4 -->
                    <div class="bg-red-500 text-white p-6 h-40 rounded-lg shadow-lg flex flex-col justify-between lg:col-span-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-3xl font-bold mb-2">65</div>
                                <div class="text-lg">Unique Visitors</div>
                            </div>
                            <Eye class="w-12 h-12 opacity-50" />
                        </div>
                        <div class="mt-4 flex justify-center">
                            <button class="flex items-center bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded hover:bg-opacity-30 transition-colors duration-300">
                                <InfoIcon class="w-4 h-4 mr-2" />
                                More info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>