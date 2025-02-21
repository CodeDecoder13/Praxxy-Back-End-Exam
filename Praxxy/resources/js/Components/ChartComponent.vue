<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Sales and Revenue Overview</h2>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: 'rgba(66, 165, 245, 0.5)',
      borderColor: '#42A5F5',
      data: [40, 60, 30, 80, 50, 70, 90],
      fill: true
    },
    {
      label: 'Revenue',
      backgroundColor: 'rgba(158, 158, 158, 0.5)',
      borderColor: '#9E9E9E',
      data: [30, 50, 20, 70, 40, 60, 80],
      fill: true
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false
    }
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
