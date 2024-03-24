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

  function getRandomMarriageCandidate(gender: string):NPC {
    const marriageCandidates = npcs.value.filter(npc => npc.marriageable);
    if (gender !== 'all') {
      const genderCandidates = marriageCandidates.filter(npc => npc.gender === parseInt(gender));
      const randomCandidate = genderCandidates[Math.floor(Math.random() * genderCandidates.length)];
      return randomCandidate;
    } else {
      const randomCandidate = marriageCandidates[Math.floor(Math.random() * marriageCandidates.length)];
      return randomCandidate;
    }
  }

  return { npcs, getRandomMarriageCandidate }
})
