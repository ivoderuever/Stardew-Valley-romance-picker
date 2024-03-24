<script setup lang="ts">
import { useStardewStore } from '@/stores/stardew';

const stardew = useStardewStore();
</script>

<template>
  <h1>{{ stardew.npcs }}</h1>
</template>
