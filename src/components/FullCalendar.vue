<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStardewStore } from '@/stores/stardew';
import { useRoute } from 'vue-router';

const stardew = useStardewStore();
const $route = useRoute();
const searchQuery = ref<string>('');
const seasons = ref<string[]>(['Spring', 'Summer', 'Fall', 'Winter']);
const eventsVisible = ref<boolean>(false);

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
    if (eventsVisible.value) {
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

    return stardew.getNpcBySeason(selectedSeason.value);
  }
});

function getImageUrl(id: string) {
  return new URL(`../assets/img/avatars/${id}.png`, import.meta.url).href
}

onMounted(() => {
  const lsEventsVisible = localStorage.getItem('eventsVisible');
  if (lsEventsVisible === undefined) localStorage.setItem('eventsVisible', 'false');
  if (lsEventsVisible === 'true') eventsVisible.value = true;
  if (lsEventsVisible === 'false') eventsVisible.value = false;
})

function toggleEventsVisible() {
  eventsVisible.value = !eventsVisible.value;
  localStorage.setItem('eventsVisible', eventsVisible.value.toString());
}

</script>

<template>
  <div>
    <div class="search-container">
      <input class="sv-search-bar" type="text" placeholder="Search NPC" v-model="searchQuery">
      <label class="sv-checkbox" for="eventsVisible"  @click="toggleEventsVisible">
        <input name="eventsVisible" type="checkbox" v-model="eventsVisible">
        <span>Show events</span>
      </label>
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
        <div v-if="searchQuery !== '' || !eventsVisible" class="sv-avatar-frame">
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
  align-items: center;
  margin: 20px 0;
}

.sv-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  background-color: var(--sv-bg);
  border: 2px solid var(--sv-border);
  color: var(--font-secondary);
  padding: 5px 7px;
  height: 20px;
  cursor: pointer;
}

.active {
  background-color: var(--sv-button-active);
  cursor: default;
}
</style>