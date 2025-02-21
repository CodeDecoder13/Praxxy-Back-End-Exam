<script setup>
import { ref, onMounted, computed } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const isLoaded = ref(false);

// Sample events - you can replace these with real data
const events = ref([
    
]);

const attributes = computed(() => [
    {
        key: 'today',
        highlight: {
            color: 'blue',
            fillMode: 'light'
        },
        dates: new Date()
    },
    ...events.value.map(event => ({
        key: event.id,
        highlight: {
            color: event.color,
            fillMode: 'solid'
        },
        dates: event.start,
        popover: {
            label: event.name
        }
    }))
]);

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 100);
});
</script>

<template>
    <div class="bg-white rounded-lg shadow p-6 h-full flex flex-col">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Calendar</h2>
        <div v-if="isLoaded" class="flex-grow flex items-stretch">
            <Calendar
                :attributes="attributes"
                :first-day-of-week="2"
                v-model="selectedDate"
                class="custom-calendar w-full"
                :is-expanded="true"
                expand
                transparent
            />
        </div>
    </div>
</template>

<style>
.vc-container {
    --vc-font-family: 'Inter', sans-serif;
    --vc-rounded-lg: 0.5rem;
    --vc-header-padding: 10px 12px;
    --vc-weekday-color: #64748b;
    --vc-weekday-font-weight: 600;
    --vc-weekday-font-size: 1rem;
    --vc-day-content-font-size: 1rem;
    --vc-day-content-width: 48px;
    --vc-day-content-height: 48px;
    --vc-day-content-margin: 2px;
    --vc-highlight-outline-width: 0;
    --vc-highlight-border-radius: 0.375rem;
    --vc-highlight-opacity: 0.75;
    font-family: var(--vc-font-family);
    width: 100% !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
}

.vc-pane-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100% !important;
}

.vc-pane {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100% !important;
}

.vc-weeks {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.vc-week {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.calendar-container {
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .vc-container {
        --vc-day-content-width: 40px;
        --vc-day-content-height: 40px;
    }
}

@media (max-width: 640px) {
    .vc-container {
        --vc-day-content-width: 36px;
        --vc-day-content-height: 36px;
        --vc-day-content-font-size: 0.875rem;
        --vc-weekday-font-size: 0.875rem;
    }
}
</style>
