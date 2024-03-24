<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="flex-center">
    <div class="sv-card">
      <h1 class="title">Stardew Valley Helperr</h1>
      <nav class="navigation">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/picker">Picker</router-link>
        <router-link class="link" to="/calendar">Calendar</router-link>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
header {
  .title {    
    padding: 0.2rem;
    margin: 0;
    text-align: center;
  }
  
  .navigation {
    display: flex;
    justify-content: space-evenly;

    .link {
      color: var(--font-secondary);
      text-decoration: none;
    }

    .router-link-active {
      text-decoration: underline;
    }
  }
}
</style>