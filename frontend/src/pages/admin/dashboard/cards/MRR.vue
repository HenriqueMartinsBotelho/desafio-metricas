<template>
  <VaCard class="flex flex-col">
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase card-title text-secondary">Monthly Recurring Revenue (MRR)</h1>
      <div class="flex-1"></div>
      <div class="flex gap-2">
        <VaButton size="small" preset="primary" @click="showUploadModal = true">Upload MRR File</VaButton>
        <VaButton class="h-2" size="small" preset="primary" @click="exportAsCSV">Export</VaButton>
      </div>
      <VaModal v-model="showUploadModal">
        <div class="flex flex-col">
          <h3 class="font-semibold mb-4">Upload MRR File</h3>
          <form @submit.prevent="submitFile">
            <div class="flex justify-between gap-8">
              <input class="flex-1" type="file" @change="handleFileUpload" />
              <div class="flex-2">
                <VaSelect
                  v-model="selectedMonth"
                  preset="small"
                  :keep-anchor-width="false"
                  :options="monthOptions"
                  class="w-64"
                />
              </div>
            </div>

            <VaButton class="mt-4" type="submit" preset="primary">Salvar Arquivo MRR</VaButton>
          </form>
        </div>
      </VaModal>
    </VaCardTitle>
    <VaCardContent class="flex flex-col-reverse justify-between h-full gap-5 md:flex-row">
      <div>
        <p class="mt-2 whitespace-nowrap">Total earnings</p>
        <p class="text-xl font-semibold">{{ formatMoney(totalEarnings) }}</p>
      </div>
      <MRRChart
        v-if="!isLoading"
        :key="chartKey"
        class="w-2/3 h-full pt-4 md:w-3/5 lg:w-3/4 min-h-72 sm:min-h-32"
        :revenues="revenues"
        :months="months"
      />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { VaCard, useToast } from 'vuestic-ui'
import MRRChart from './MRRChart.vue'
import { downloadAsCSV } from '../../../../services/toCSV'
import { months, formatMoney, Revenues } from '../../../../data/charts/revenueChartData'
import axios from '../../../../services/axios'
import { monthOptions } from '../../../../data/months'

type Metric = {
  id: number
  mrr: number
}

const chartKey = ref(0)

const { init } = useToast()

const file = ref<File | null>(null)
const isLoading = ref(true)
const userId = ref<number>(1)

const metrics = ref<Metric[]>([])
const showUploadModal = ref(false)

const selectedMonth = ref(monthOptions[1].text)

watch(
  selectedMonth,
  (newValue: any) => {
    if (newValue && typeof newValue === 'object' && newValue.value) {
      selectedMonth.value = newValue.value
    }
  },
  { deep: true },
)

const updateChart = async () => {
  try {
    revenues.value = []

    const metricsDataArray = await Promise.all(months.map((_, index) => fetchMetricsForMonth(userId.value, index + 1)))

    metricsDataArray.forEach((metricsData, index) => {
      if (metricsData) {
        const totalEarnings = metricsData.reduce((acc: number, curr: any) => acc + curr.mrr, 0)
        revenues.value.push({ month: months[index], earning: totalEarnings })
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    chartKey.value++
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    file.value = target.files[0]
  }
}

const submitFile = async () => {
  const formData = new FormData()
  if (file.value) {
    formData.append('file', file.value, file.value.name)
  }

  try {
    await axios.post(`/mrr/calculate?userId=${userId.value}&mes=${selectedMonth.value}`, formData)
    init({ message: 'MRR file uploaded successfully', color: 'success' })
    updateChart()
  } catch (error) {
    console.error(error)
  }
}

const fetchMetricsForMonth = async (userId: number, month: number) => {
  try {
    const response = await axios.get(`/mrr/metrics?userId=${userId}&mes=${month}`)
    console.log('aaaaaa', response.data)
    return response.data as Metric[]
  } catch (error) {
    console.error(error)
    throw error
  }
}

const loadAllMetrics = async () => {
  const promises = months.map((_, index) => fetchMetricsForMonth(userId.value, index + 1))

  try {
    const metricsDataArray = await Promise.all(promises)
    metricsDataArray.forEach((metricsData, index) => {
      if (metricsData) {
        metrics.value.push(...metricsData)
        const totalEarnings = metricsData.reduce((acc: number, curr: any) => Number(acc) + Number(curr.mrr), 0)
        revenues.value.push({
          month: months[index],
          earning: totalEarnings,
        })
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadAllMetrics()
})

const revenues = ref<Revenues[]>([])

const totalEarnings = computed(() => {
  return revenues.value.reduce((acc, revenue) => Number(acc) + Number(revenue.earning), 0)
})

const exportAsCSV = () => {
  downloadAsCSV(revenues.value, 'revenue-report')
}
</script>
