<script lang="ts" setup>
import MRR from './cards/MRR.vue'
import AnnualGrowth from './cards/AnnualGrowth.vue'
import ChurnRate from './cards/ChurnRate.vue'
</script>

<template>
  <section class="flex flex-col gap-4">
    <h1 class="my-0 font-bold va-h1">Dashboard</h1>
    <div class="flex flex-col gap-4 sm:flex-row">
      <MRR class="w-full sm:w-[70%]" />
      <div class="flex flex-col gap-4 w-full sm:w-[30%]">
        <AnnualGrowth class="h-full" />
        <ChurnRate />
      </div>
    </div>
  </section>
</template>
