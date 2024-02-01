<template>
  <VaCard>
    <VaCardTitle class="pb-0!">
      <h1 class="font-bold uppercase card-title text-secondary">Annual growth</h1>
    </VaCardTitle>
    <VaCardContent class="flex flex-row gap-1">
      <section class="w-1/2">
        <div class="mb-2 text-xl font-bold">$36,358</div>
        <p class="text-xs text-success whitespace-nowrap">
          <VaIcon name="arrow_outward" />
          +2,5%
          <span class="text-secondary"> last year</span>
        </p>
        <div class="flex items-center gap-4 my-4">
          <div class="flex items-center">
            <span class="inline-block w-2 h-2 mr-2" :style="{ backgroundColor: profitBackground }"></span>
            <span class="text-secondary">FE</span>
          </div>
          <div class="flex items-center">
            <span class="inline-block w-2 h-2 mr-2" :style="{ backgroundColor: earningsBackground }"></span>
            <span class="text-secondary">FE</span>
          </div>
        </div>
      </section>
      <div class="flex items-center flex-1 w-1/2 h-full pl-2 lg:pl-16">
        <VaChart :data="chartData" class="chart chart--donut" type="doughnut" :options="doughnutConfig" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard } from 'vuestic-ui'
import VaChart from '../../../../components/va-charts/VaChart.vue'
import { useChartData } from '../../../../data/charts/composables/useChartData'
import { doughnutChartData, profitBackground, earningsBackground } from '../../../../data/charts/doughnutChartData'
import { doughnutConfig } from '../../../../components/va-charts/vaChartConfigs'

const chartData = useChartData(doughnutChartData)
</script>
