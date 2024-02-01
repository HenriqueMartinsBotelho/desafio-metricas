<template>
  <div class="relative flex justify-center w-full h-full overflow-hidden">
    <canvas ref="canvas" style="max-width: 100%"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { Revenues } from '../../../../data/charts/revenueChartData'
import { earningsColor, formatMoney } from '../../../../data/charts/revenueChartData'

const { revenues, months } = defineProps<{
  months: string[]
  revenues: Revenues[]
}>()

Chart.register(...registerables)

console.log('222', revenues)

const canvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
  if (canvas.value && revenues) {
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy()
      }

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              data: revenues.map(({ earning }) => earning),
              backgroundColor: earningsColor,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => formatMoney(Number(value)),
              },
            },
          },
        },
      })
    }
  }
}

watch([() => revenues, () => months], () => {
  createChart()
})

onMounted(createChart)
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
