<script setup lang="ts">
import { computed, ref } from 'vue';
import type { NPC } from '@/helpers/interface/npc';
import { useStardewStore } from '@/stores/stardew';

const stardew = useStardewStore();
const selectedSeason = ref<number | null>(null);
const searchQuery = ref<string>('');

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
}

// computed npcList that when query is not "" return npcList filtered on name eq query
// computed npcList that when selectedSeason is not null return npcList filtered on season eq selectedSeason
// computed npcList that when query is not "" and selectedSeason is not null return npcList filtered on name eq query and season eq selectedSeason

const npcList = computed<NPC[]>(() => {
  let list;
  if (searchQuery.value !== '') {
    list = stardew.getNpcBySeason(null).filter((npc) => npc.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  } else {
    list = stardew.getNpcBySeason(selectedSeason.value);
  }
  return list;
});

function getImageUrl(id: string) {
  return new URL(`../assets/img/avatars/${id}.png`, import.meta.url).href
}

</script>

<template>
  <div>
    <div class="search-container">
      <input class="sv-search-bar" type="text" placeholder="Search" v-model="searchQuery">
    </div>
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
            <img :src="getImageUrl(npc.id.toString())" :alt="npc.name" />
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

.search-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>