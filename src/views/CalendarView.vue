<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStardewStore } from '@/stores/stardew';

const router = useRouter();
const $route = useRoute();
const stardew = useStardewStore();

function redirect() {
  if (stardew.favoriteNpcs.length === 0) {
    router.push({ name: 'fullCalendar' });
  } else {
    router.push({ name: 'favorites' });
  }
}

// watch route to go back to /calendar and redirect them to the correct route
watch(() => $route.name, (name) => {
  if (name === 'calendar') {
    redirect();
  }
});

onMounted(() => {
  redirect();
});

</script>

<template>
  <div>
    <div>
      <router-link :to="{name: 'fullCalendar'}">All</router-link>
      <router-link :to="{name: 'favorites'}">Favorites</router-link>
    </div>
    <router-view />
  </div>
</template>