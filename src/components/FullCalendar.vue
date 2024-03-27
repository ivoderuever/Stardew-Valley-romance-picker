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
  console.log('why this not work?')
  npcList.value = stardew.getNpcBySeason(selectedSeason.value);
});

</script>

<template>
  <div>
    <div class="seasons flex-evenly">
      <button class="sv-btn" @click="setSeason(0)" type="button">Spring</button>
      <button class="sv-btn" @click="setSeason(1)" type="button">Summer</button>
      <button class="sv-btn" @click="setSeason(2)" type="button">Fall</button>
      <button class="sv-btn" @click="setSeason(3)" type="button">Winter</button>
    </div>
    <div class="villager-container">
      <div v-for="npc in npcList" :key="npc.id" class="villager">
        <div class="sv-avatar-frame">
          <a :href="`https://stardewvalleywiki.com/${npc.name}`" target="_blank">
            <img :src="`/src/assets/img/avatars/${npc.id.toString()}.png`" :alt="npc.name" />
          </a>
          <h2>
            <span>{{ npc.name }}</span>
            <span>{{ season(npc.birthday.season) }} {{ npc.birthday.day }}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.seasons {
  position: relative;
  margin: 0 auto;
  width: 400px;
  display: flex;
  justify-content: space-evenly;
}

.sv-avatar-frame {
  h2 {
    span {
      display: block;
    }
  }
}

.villager-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>