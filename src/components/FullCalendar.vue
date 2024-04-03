<script setup lang="ts">
import { computed, ref } from 'vue';
import type { NPC } from '@/helpers/interface/npc';
import { useStardewStore } from '@/stores/stardew';
import { useRoute } from 'vue-router';

const stardew = useStardewStore();
const route = useRoute();
const searchQuery = ref<string>('');
const seasons = ref<string[]>(['Spring', 'Summer', 'Fall', 'Winter']);

function season(seasonId: number) {
  return seasons.value[seasonId];
}

const selectedSeason = computed(() => {
  if (route.params.season === 'all') {
    return null;
  }
  return seasons.value.findIndex((season) => season.toLowerCase() === route.params.season);
});

const npcList = computed<NPC[]>(() => {
  if (searchQuery.value !== '') {
    return stardew.getNpcBySeason(null).filter((npc) => npc.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  } else {
    return stardew.getNpcBySeason(selectedSeason.value);
  }
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
      <router-link :to="{ name: 'fullCalendar', params: { season: 'all' }}" class="sv-btn" >All seasons</router-link>
      <router-link v-for="(season, index) in seasons" :key="index" :to="{ name: 'fullCalendar', params: { season: season.toLowerCase() }}" class="sv-btn">{{ season }}</router-link>
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
  width: 500px;
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