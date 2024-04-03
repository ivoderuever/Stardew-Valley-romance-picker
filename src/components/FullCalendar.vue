<script setup lang="ts">
import { computed, ref } from 'vue';
import type { NPC } from '@/helpers/interface/npc';
import { useStardewStore } from '@/stores/stardew';
import { useRoute } from 'vue-router';

const stardew = useStardewStore();
const $route = useRoute();
const searchQuery = ref<string>('');
const seasons = ref<string[]>(['Spring', 'Summer', 'Fall', 'Winter']);

function season(seasonId: number) {
  return seasons.value[seasonId];
}

const selectedSeason = computed(() => {
  if ($route.params.season === 'all') {
    return null;
  }
  return seasons.value.findIndex((season) => season.toLowerCase() === $route.params.season);
});

const calendarItems = computed<any[]>(() => {
  if (searchQuery.value !== '') {
    return stardew.getNpcBySeason(null).filter((npc) => npc.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  } else {
    const npcBySeason = stardew.getNpcBySeason(selectedSeason.value);
    const festivalBySeason = stardew.getFestivalBySeason(selectedSeason.value);

    let mixedlist = [...npcBySeason.map(npc => ({ ...npc, type: 'npc' })), ...festivalBySeason.map(festival => ({ ...festival, type: 'festival' }))].sort((a, b) => {
      if (a.date.season === b.date.season) {
        return Number(a.date.day) - Number(b.date.day);
      }
      return a.date.season - b.date.season;
    });

    return mixedlist;
  }
});

function getImageUrl(id: string) {
  return new URL(`../assets/img/avatars/${id}.png`, import.meta.url).href
}

</script>

<template>
  <div>
    <div class="search-container">
      <input class="sv-search-bar" type="text" placeholder="Search NPC" v-model="searchQuery">
    </div>
    <div class="seasons flex-evenly">
      <router-link :to="{ name: 'fullCalendar', params: { season: 'all' }}" class="sv-btn" :class="$route.params.season === 'all' ? 'active' : ''">All seasons</router-link>
        <router-link v-for="(season, index) in seasons" :key="index" :to="{ name: 'fullCalendar', params: { season: season.toLowerCase() }}" class="sv-btn" :class="$route.params.season === season.toLowerCase() ? 'active' : ''">{{ season }}</router-link>
      </div>
    <div class="villager-container">
      <div v-for="(item, index) in calendarItems" :key="index" class="villager">
        <div v-if="item.type === 'npc'" class="sv-avatar-frame">
          <a :href="`https://stardewvalleywiki.com/${item.name}`" target="_blank">
            <img :src="getImageUrl(item.id.toString())" :alt="item.name" />
          </a>
          <h2>
            <span>{{ item.name }}</span>
            <span>{{ season(item.date.season) }} {{ item.date.day }}</span>
          </h2>
        </div>
        <div v-if="item.type === 'festival'" class="sv-avatar-frame">
          <a class="fake-width" :href="`https://stardewvalleywiki.com/${item.name}`" target="_blank">
            <img class="icon" v-if="item.eventType === 'event'" src="../assets/img/icons/event.png" :alt="item.name" />
            <img class="icon" v-if="item.eventType === 'festival'" src="../assets/img/icons/festival.gif" :alt="item.name" />
          </a>
          <h2>
            <span>{{ item.name }}</span>
            <span>{{ season(item.date.season) }} {{ item.date.day }}</span>
          </h2>
        </div>
        <div v-if="searchQuery !== ''" class="sv-avatar-frame">
          <a :href="`https://stardewvalleywiki.com/${item.name}`" target="_blank">
            <img :src="getImageUrl(item.id.toString())" :alt="item.name" />
          </a>
          <h2>
            <span>{{ item.name }}</span>
            <span>{{ season(item.date.season) }} {{ item.date.day }}</span>
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
  
  .fake-width {
    width: 178px;
    height: 178px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 50px;
    height: 50px;
  }

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

.active {
  background-color: var(--sv-button-active);
  cursor: default;
}
</style>