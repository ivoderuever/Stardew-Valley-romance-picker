<script setup lang="ts">
import { ref } from 'vue';
import { useStardewStore } from '@/stores/stardew';
import type { NPC } from '@/helpers/interface/npc';

const stardew = useStardewStore();
const selectedType = ref<string | null>(null);
const selectedPartner = ref<NPC>();

function setType(type: string) {
  if (type === 'all') {
    selectedType.value = 'all';
  } else if (type === '') {
    selectedType.value = null;
  } else {
    selectedType.value = type;
  }

  getPartner();
}

function getPartner() {
  selectedPartner.value = stardew.getRandomMarriageCandidate(selectedType.value as string);
}
</script>

<template>
  <div class="flex-center">
    <div class="sv-card w-400 text-center" v-if="selectedType === null">
      <h2>Which group of candidates do you want to get randomized result from?</h2>
      <div class="space-evenly">
        <button class="sv-btn" @click="setType('all')" type="button">All</button>
        <button class="sv-btn" @click="setType('0')" type="button">Bachelors</button>
        <button class="sv-btn" @click="setType('1')" type="button">Bachelorettes</button>
      </div>
    </div>
    <div v-else>
      <div class="center">
        <h2>A suggested romance partner:</h2>
        <div class="sv-avatar-frame">
          <img :src="`/src/assets/img/avatars/${selectedPartner?.id.toString()}.png`" :alt="selectedPartner?.name" />
          <h2>{{ selectedPartner?.name }}</h2>
        </div>
        <button class="sv-btn mb-20" @click="setType(selectedType)" type="button">Randomize</button>
        <button class="sv-btn" @click="setType('')" type="button">Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .w-400 {
    width: 400px;
  }
  
  .text-center {
    text-align: center;
  }

  .space-evenly {
    display: flex;
    justify-content: space-evenly;
  }

  .mb-20 {
    margin-bottom: 20px;
  }
</style>
