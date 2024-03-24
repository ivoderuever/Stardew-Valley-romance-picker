<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { NPC } from '@/helpers/interface/npc';
import { useStardewStore } from '@/stores/stardew';

const stardew = useStardewStore();
const selectedSeason = ref<number | null>(null);
const npcList = ref<NPC[]>([]);

function season(seasonId: number) {
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  return seasons[seasonId];
}

function setSeason(seasonId: number) {
  if (selectedSeason.value === seasonId) {
    selectedSeason.value = null;
  } else {
    selectedSeason.value = seasonId;
  }
  npcList.value = stardew.getNpcBySeason(selectedSeason.value);
}

onMounted(() => {
  npcList.value = stardew.getNpcBySeason(selectedSeason.value);
});

</script>

<template>
  <div>
    <div class="flex-evenly">
      <button class="sv-btn" @click="setSeason(0)" type="button">Spring</button>
      <button class="sv-btn" @click="setSeason(1)" type="button">Summer</button>
      <button class="sv-btn" @click="setSeason(2)" type="button">Fall</button>
      <button class="sv-btn" @click="setSeason(3)" type="button">Winter</button>
    </div>
    <div class="villager-container">
      <div v-for="npc in npcList" :key="npc.id" class="villager">
        <div class="sv-avatar-frame">
          <img :src="`/src/assets/img/avatars/${npc.id.toString()}.png`" :alt="npc.name" />
          <h2><p>{{ npc.name }}</p><p>{{ season(npc.birthday.season) }} {{ npc.birthday.day }}</p></h2>
        </div>
      </div>
    </div>
  </div>
</template>