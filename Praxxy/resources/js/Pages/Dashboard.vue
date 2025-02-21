<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ShoppingBag, Users, Eye, BarChart2, Video, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, Map as MapIcon } from 'lucide-vue-next';
import { computed, ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import VisitorMap from '@/Components/VisitorMap.vue';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Register ECharts components
use([
    CanvasRenderer,
    LineChart,
    BarChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
]);

// Chart type state
const activeChart = ref('activity');

// Props definition with proper defaults
const props = defineProps({
    stats: {
        type: Object,
        default: () => ({
            products_count: 0,
            users_count: 0,
            videos_count: 0,
            unique_visitors: 0,
            chart_data: {
                dates: [],
                products: [],
                videos: [],
                users: [],
                visitors: [],
            },
            visitor_locations: []
        })
    }
});

// Safe stats with proper fallbacks
const safeStats = computed(() => ({
    products_count: props.stats?.products_count ?? 0,
    users_count: props.stats?.users_count ?? 0,
    videos_count: props.stats?.videos_count ?? 0,
    unique_visitors: props.stats?.unique_visitors ?? 0,
    chart_data: props.stats?.chart_data ?? {
        dates: [],
        products: [],
        videos: [],
        users: [],
        visitors: [],
    },
    visitor_locations: props.stats?.visitor_locations ?? []
}));

// Stats cards configuration for better maintainability
const statsCards = computed(() => [
    {
        title: 'Products',
        count: safeStats.value.products_count,
        icon: ShoppingBag,
        color: 'blue'
    },
    {
        title: 'Users',
        count: safeStats.value.users_count,
        icon: Users,
        color: 'green'
    },
    {
        title: 'Videos',
        count: safeStats.value.videos_count,
        icon: Video,
        color: 'red'
    },
    {
        title: 'Visitors',
        count: safeStats.value.unique_visitors,
        icon: Eye,
        color: 'gray'
    }
]);

// Chart toggle buttons configuration
const chartToggleButtons = [
    {
        id: 'activity',
        label: 'Bar Chart',
        icon: BarChartIcon
    },
    {
        id: 'trends',
        label: 'Line Chart',
        icon: LineChartIcon
    },
    {
        id: 'distribution',
        label: 'Pie Chart',
        icon: PieChartIcon
    },
    {
        id: 'map',
        label: 'Map View',
        icon: MapIcon
    }
];

// Chart options
const pieChartOption = computed(() => ({
    title: {
        text: 'Distribution Overview',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        top: '30px',
        data: ['Products', 'Videos', 'Users', 'Visitors']
    },
    series: [
        {
            name: 'Distribution',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}: {c} ({d}%)'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            data: [
                {
                    value: safeStats.value.products_count,
                    name: 'Products',
                    itemStyle: { color: '#3B82F6' }
                },
                {
                    value: safeStats.value.videos_count,
                    name: 'Videos',
                    itemStyle: { color: '#A855F7' }
                },
                {
                    value: safeStats.value.users_count,
                    name: 'Users',
                    itemStyle: { color: '#22C55E' }
                },
                {
                    value: safeStats.value.unique_visitors,
                    name: 'Visitors',
                    itemStyle: { color: '#EAB308' }
                }
            ]
        }
    ]
}));

const activityChartOption = computed(() => ({
    title: {
        text: 'Daily Activity',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        top: '30px',
        data: ['Products', 'Videos', 'Users', 'Visitors']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '70px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: safeStats.value.chart_data.dates,
        axisLabel: {
            rotate: 45
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Products',
            type: 'bar',
            stack: 'total',
            data: safeStats.value.chart_data.products,
            itemStyle: { color: '#3B82F6' }
        },
        {
            name: 'Videos',
            type: 'bar',
            stack: 'total',
            data: safeStats.value.chart_data.videos,
            itemStyle: { color: '#A855F7' }
        },
        {
            name: 'Users',
            type: 'bar',
            stack: 'total',
            data: safeStats.value.chart_data.users,
            itemStyle: { color: '#22C55E' }
        },
        {
            name: 'Visitors',
            type: 'bar',
            stack: 'total',
            data: safeStats.value.chart_data.visitors,
            itemStyle: { color: '#EAB308' }
        }
    ]
}));

const trendsChartOption = computed(() => ({
    title: {
        text: 'Activity Trends',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        top: '30px',
        data: ['Products', 'Videos', 'Users', 'Visitors']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '70px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: safeStats.value.chart_data.dates,
        axisLabel: {
            rotate: 45
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Products',
            type: 'line',
            data: safeStats.value.chart_data.products,
            itemStyle: { color: '#3B82F6' },
            smooth: true
        },
        {
            name: 'Videos',
            type: 'line',
            data: safeStats.value.chart_data.videos,
            itemStyle: { color: '#A855F7' },
            smooth: true
        },
        {
            name: 'Users',
            type: 'line',
            data: safeStats.value.chart_data.users,
            itemStyle: { color: '#22C55E' },
            smooth: true
        },
        {
            name: 'Visitors',
            type: 'line',
            data: safeStats.value.chart_data.visitors,
            itemStyle: { color: '#EAB308' },
            smooth: true
        }
    ]
}));

const currentChartOption = computed(() => {
    switch (activeChart.value) {
        case 'activity':
            return activityChartOption.value;
        case 'trends':
            return trendsChartOption.value;
        case 'distribution':
            return pieChartOption.value;
        default:
            return activityChartOption.value;
    }
});

// Helper functions
const getChartTitle = (chartType) => {
    switch (chartType) {
        case 'activity':
            return 'Daily Activity';
        case 'trends':
            return 'Activity Trends';
        case 'distribution':
            return 'Distribution Overview';
        case 'map':
            return 'Visitor Locations';
        default:
            return 'Dashboard Overview';
    }
};

const location = ref({
    latitude: null,
    longitude: null,
    error: null
});

const updateLocation = async () => {
    if (!navigator.geolocation) {
        location.value.error = 'Geolocation is not supported by your browser';
        return;
    }

    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        location.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
        };

        // Send location to backend
        await axios.post('/api/update-location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    } catch (error) {
        location.value.error = 'Unable to retrieve your location';
        console.error('Location error:', error);
    }
};

onMounted(() => {
    updateLocation();
});
</script>

<template>
    <Head title="Dashboard" />
    
    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-black">
                Admin Dashboard
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="mb-8 flex items-center">
                    <BarChart2 class="w-8 h-8 mr-3 text-gray-700" />
                    <h3 class="text-2xl font-bold text-gray-800">Dashboard Overview</h3>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div 
                        v-for="card in statsCards" 
                        :key="card.title"
                        :class="`bg-${card.color}-500 text-white p-6 rounded-lg shadow-lg`"
                    >
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-3xl font-bold mb-2">{{ card.count }}</div>
                                <div class="text-lg">{{ card.title }}</div>
                            </div>
                            <component :is="card.icon" class="w-12 h-12 opacity-50" />
                        </div>
                    </div>
                </div>

                <!-- Combined Chart/Map Container -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold text-gray-800">
                            {{ getChartTitle(activeChart) }}
                        </h4>
                        <div class="flex gap-2">
                            <button 
                                v-for="btn in chartToggleButtons.filter(btn => btn.id !== 'map')"
                                :key="btn.id"
                                @click="activeChart = btn.id"
                                :class="[
                                    'px-3 py-2 rounded-lg flex items-center gap-2 transition-colors',
                                    activeChart === btn.id
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                ]"
                            >
                                <component :is="btn.icon" class="w-4 h-4" />
                                <span>{{ btn.label }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="h-[400px]">
                        <v-chart 
                            class="w-full h-full" 
                            :option="currentChartOption" 
                            :autoresize="true"
                        />
                    </div>
                </div>

                <!-- Map Section -->
                <div class="bg-white p-6 rounded-lg shadow-lg mt-8">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold text-gray-800">Visitor Locations</h4>
                        <div class="flex items-center text-gray-600">
                            <MapIcon class="w-4 h-4 mr-2" />
                            <span>Geographic Distribution</span>
                        </div>
                    </div>
                    <div class="h-[400px]">
                        <visitor-map
                            class="w-full h-full"
                            :locations="safeStats.visitor_locations"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style>
</style>