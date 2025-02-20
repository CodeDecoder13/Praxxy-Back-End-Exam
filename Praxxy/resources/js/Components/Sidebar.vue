<script setup>
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import {
    Home,
    Users,
    ShoppingBag,
    Video,
    ChevronDown,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-vue-next';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: true
    },
    isMinimized: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['toggle']);

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <!-- Sidebar -->
        <div id="hs-sidebar-footer" 
            :class="{ '-translate-x-full': !isOpen, 'w-20': isMinimized, 'w-64': !isMinimized }"
            class="fixed top-0 start-0 bottom-0 z-[60] bg-gray-200 border-e border-gray-300 transition-transform duration-300 transform h-full lg:translate-x-0" 
            role="dialog" 
            tabindex="-1" 
            aria-label="Sidebar">
            <div class="relative flex flex-col h-full max-h-full">
                <!-- Header -->
                <header class="p-4 flex flex-col items-start gap-y-2 bg-gray-200">
                    <div class="flex w-full justify-between items-center">
                        <Link :href="route('dashboard')" class="flex-none font-semibold text-xl text-gray-900 focus:outline-none focus:opacity-80">
                            {{ isMinimized ? 'AD' : 'Admin Dashboard' }}
                        </Link>
                        <button type="button" 
                            class="lg:hidden flex justify-center items-center size-8 text-gray-600 hover:text-gray-700" 
                            data-hs-overlay="#hs-sidebar-footer">
                            <X class="size-5" />
                        </button>
                    </div>
                    <div class="w-full border-b border-gray-400"></div>
                </header>
                <div class="w-full flex items-center justify-between gap-x-2 p-2 text-gray-700">
                    <div class="flex items-center gap-x-2">
                        <img class="size-8 rounded-full" 
                            src="https://images.unsplash.com/photo-1734122415415-88cb1d7d5dc0?q=80&w=320&h=320&auto=format&fit=facearea&facepad=3" 
                            alt="Profile">
                        <span v-if="!isMinimized">{{ $page.props.auth.user.name }}</span>
                    </div>
                </div>
                <div class="w-full border-b border-gray-400 mb-2"></div>

                <!-- Navigation -->
                <nav class="flex-1 overflow-y-auto p-4">
                    <ul class="space-y-2">
                        <!-- Dashboard -->
                        <li>
                            <Link :href="route('dashboard')" 
                                :class="{ 'bg-gray-300': route().current('dashboard') }"
                                class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors">
                                <Home class="size-5" />
                                <span v-if="!isMinimized">Admin Dashboard</span>
                            </Link>
                        </li>

                        <!-- Product Management -->
                        <li>
                            <Link :href="route('sidebar.product-management')" 
                                class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors">
                                <Users class="size-5" />
                                <span v-if="!isMinimized">Product Management</span>
                            </Link>
                        </li>

                        <!-- Users -->
                        <li>
                            <Link :href="route('sidebar.user-management')" 
                                class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors">
                                <Users class="size-5" />
                                <span v-if="!isMinimized">Users Management</span>
                            </Link>
                        </li>

                        <!-- Video -->
                        <li>
                            <Link :href="route('sidebar.video-management')" 
                                class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors">
                                <Video class="size-5" />
                                <span v-if="!isMinimized">Video Management</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <!-- Footer -->
                <footer class="p-4 border-t border-gray-300">
                    <div class="space-y-2">
                        <Link :href="route('profile.edit')" 
                            class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full">
                            <Settings class="size-4" />
                            <span v-if="!isMinimized">Profile Settings</span>
                        </Link>
                        <Link :href="route('logout')" 
                            method="post" 
                            as="button"
                            class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full">
                            <LogOut class="size-4" />
                            <span v-if="!isMinimized">Logout</span>
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>