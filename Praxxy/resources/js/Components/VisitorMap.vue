<script setup>
import { onMounted, ref } from 'vue';
import { LMap, LTileLayer, LCircleMarker, LTooltip } from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define props
const props = defineProps({
    locations: {
        type: Array,
        default: () => []
    }
});

// Map settings
const mapCenter = ref([12.8797, 121.7740]); // Center of Philippines
const mapZoom = ref(6);
const mapReady = ref(false);
const isClient = ref(false);

// Calculate circle size based on visitor count
const getCircleSize = (count) => {
    return Math.max(20, Math.min(50, count / 3));
};

// Handle map ready event
const onMapReady = () => {
    mapReady.value = true;
};

onMounted(() => {
    isClient.value = true;
});
</script>

<template>
    <div class="w-full h-full">
        <LMap
            v-if="isClient"
            class="w-full h-full rounded-lg"
            :zoom="mapZoom"
            :center="mapCenter"
            @ready="onMapReady"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <template v-if="mapReady">
                <LCircleMarker
                    v-for="(location, index) in locations"
                    :key="index"
                    :lat-lng="[location.lat, location.lng]"
                    :radius="getCircleSize(location.count)"
                    color="#3B82F6"
                    fillColor="#3B82F6"
                    :fillOpacity="0.6"
                >
                    <LTooltip>
                        <div class="font-semibold">{{ location.city }}</div>
                        <div>Visitors: {{ location.count }}</div>
                    </LTooltip>
                </LCircleMarker>
            </template>
        </LMap>
    </div>
</template>

<style>
.leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.leaflet-control-container .leaflet-control {
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
