import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import type { NPC } from '@/helpers/interface/npc';

export const useStardewStore = defineStore('stardew', () => {
  // load npc data frrom npc.json
  const npcs = ref<NPC[]>([]);

  const loadNpcs = async () => {
    const response = await fetch('/src/helpers/data/npc.json');
    const data = await response.json();
    npcs.value = data;
  }

  onMounted(loadNpcs);

  return { npcs }
})
