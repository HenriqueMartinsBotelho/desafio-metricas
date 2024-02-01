<template>
  <VaCard class="flex flex-col">
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="font-bold uppercase card-title text-secondary">Churn Rate</h1>
      <div class="flex gap-2">
        <VaButton size="small" preset="primary" @click="showUploadModal = true">Upload Churn Rate File</VaButton>
        <VaButton class="h-2" size="small" preset="primary" @click="exportAsCSV">Export</VaButton>
      </div>
      <VaModal v-model="showUploadModal">
        <div class="flex flex-col">
          <h3 class="font-semibold mb-4">Upload Churn Rate File</h3>
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
            <VaButton class="mt-4" type="submit" preset="primary">Save Churn Rate File</VaButton>
          </form>
        </div>
      </VaModal>
    </VaCardTitle>
    <VaCardContent class="flex flex-col-reverse justify-between h-full gap-5 md:flex-row md:items-center">
      <ChurnRateChart
        v-if="!isLoading"
        class="w-2/3 h-full pt-4 md:w-3/5 lg:w-3/4 min-h-72 sm:min-h-32"
        :months="months"
        :revenues="churnRates"
      />
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { VaCard, VaButton, VaModal, VaSelect, useToast } from 'vuestic-ui'
import ChurnRateChart from './ChurnRateChart.vue'
import axios from '../../../../services/axios'
import { downloadAsCSV } from '../../../../services/toCSV'
import { monthOptions } from '../../../../data/months'
import { months } from '../../../../data/charts/revenueChartData'

type ChurnRate = {
  id: number
  mes: string
  churnRate: string
}

const churnRates = ref<ChurnRate[]>([])
const showUploadModal = ref(false)
const file = ref<File | null>(null)
const userId = ref<number>(1)
const isLoading = ref(true)
const selectedMonth = ref(monthOptions[1].value)

const { init } = useToast()

const fetchChurnRatesForMonth = async (userId: number, month: number) => {
  try {
    const response = await axios.get(`/churn-rate/rates?userId=${userId}&mes=${month}`)
    return response.data as ChurnRate[]
  } catch (error) {
    console.error(error)
    throw error
  }
}

const loadAllChurnRates = async () => {
  const promises = months.map((_, index) => fetchChurnRatesForMonth(userId.value, index + 1))

  try {
    const churnRatesDataArray = await Promise.all(promises)
    churnRatesDataArray.forEach((data, index) => {
      if (data) {
        console.log('data', data)
        const totalChurnRate = data.reduce((acc, curr) => Number(acc) + Number(curr.churnRate), 0)
        churnRates.value.push({
          id: data[0].id,
          mes: monthOptions[index].text,
          churnRate: totalChurnRate.toString(),
        })
      }
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
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
    await axios.post('/churn-rate/calculate', formData)
    init({ message: 'Churn Rate file uploaded successfully', color: 'success' })
    loadAllChurnRates()
  } catch (error) {
    console.error(error)
    init({ message: 'Error uploading file', color: 'error' })
  }
}

onMounted(() => {
  loadAllChurnRates()
})

const exportAsCSV = () => {
  downloadAsCSV(churnRates.value, 'churn-rate-report')
}
</script>
