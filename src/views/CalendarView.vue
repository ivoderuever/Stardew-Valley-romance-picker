<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStardewStore } from '@/stores/stardew';

const router = useRouter();
const $route = useRoute();
const stardew = useStardewStore();

const spoilerWarning = ref(true);

function redirect() {
  if (stardew.favoriteNpcs.length === 0) {
    if ($route.params.season === undefined) {
      router.push({ name: 'fullCalendar', params: { season: 'all' }});
    }
    return;
  } else {
    router.push({ name: 'favorites' });
    return;
  }
}

// watch route to go back to /calendar and redirect them to the correct route
watch(() => $route.name, (name) => {
  if (name === 'calendar') {
    redirect();
  }
});

onMounted(async () => {
  const warning = localStorage.getItem('spoilerWarning');
  if (warning === 'false') {
    spoilerWarning.value = false;
  }
  redirect();
});

function disableSpoiler() {
  spoilerWarning.value = false;
  localStorage.setItem('spoilerWarning', 'false');
}

</script>

<template>
  <div v-if="!spoilerWarning">
    <!-- <div class="tabs">
      <router-link :to="{name: 'fullCalendar'}">All</router-link>
      <router-link :to="{name: 'favorites'}">Favorites</router-link>
    </div> -->
    <router-view />
  </div>
  <div class="flex-center" v-else>
    <div class="sv-card w-400">
      <h2>Warning!</h2>
      <p>This page contains spoilers for character you meet later. If you don't care you can safely proceed. But don't say I did not warn you.</p>
      <div class="space-evenly">
        <button class="sv-btn" @click="disableSpoiler()" type="button">Continue</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--font);
    font-size: 24px;
  }

  .router-link-active {
    text-decoration: underline;
  }
}

.w-400 {
  width: 400px;
}
</style>