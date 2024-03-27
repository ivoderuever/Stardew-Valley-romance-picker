import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NPC } from '@/helpers/interface/npc';
import npc from '../helpers/data/npc.json'


export const useStardewStore = defineStore('stardew', () => {
  // load npc data frrom npc.json
  const npcs = ref<NPC[]>(npc);
  const favoriteNpcs = ref<NPC[]>([]);


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

  function getNpcBySeason(season: number | null):NPC[] {
    if (season === null) {
      // return all npc's sorted by birthday season and day
      return npcs.value.sort((a, b) => a.birthday.season - b.birthday.season || a.birthday.day - b.birthday.day);
    } else {
      // return npc's with the birthday season sorted by day
      const npcsBySeason = npcs.value.filter(npc => npc.birthday.season === season);
      return npcsBySeason.sort((a, b) => a.birthday.day - b.birthday.day);
    }
  }

  return { npcs, favoriteNpcs, getRandomMarriageCandidate, getNpcBySeason }
})
