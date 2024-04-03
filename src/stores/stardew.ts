import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { NPC } from '@/helpers/interface/npc';
import type { Festival } from '@/helpers/interface/festival';
import npc from '../helpers/data/npc.json'
import festival from '../helpers/data/festival.json'

export const useStardewStore = defineStore('stardew', () => {
  const npcs = ref<NPC[]>(npc);
  const festivals = ref<Festival[]>(festival);
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
      // return all npc's sorted by date season and day
      return npcs.value.sort((a, b) => a.date.season - b.date.season || a.date.day - b.date.day);
    } else {
      // return npc's with the date season sorted by day
      const npcsBySeason = npcs.value.filter(npc => npc.date.season === season);
      return npcsBySeason.sort((a, b) => a.date.day - b.date.day);
    }
  }

  function getFestivalBySeason(season: number | null):Festival[] {
    // if season is null return all festivals sorted by season and day and duplicate season for every day in the array
    if (season === null) {
      const allFestivals = festivals.value.flatMap(festival => {
      const days = Array.isArray(festival.date.day) ? festival.date.day : [festival.date.day];
        return days.map(day => {
          return { ...festival, date: { season: festival.date.season, day } };
        });
      });
      return allFestivals.sort((a, b) => a.date.season - b.date.season || a.date.day - b.date.day);
    } else {
      // return festivals with the date season and duplicate season for every day in the array
      const festivalsBySeason = festivals.value.filter(festival => festival.date.season === season);
      const festivalsBySeasonAndDay = festivalsBySeason.flatMap(festival => {
      const days = Array.isArray(festival.date.day) ? festival.date.day : [festival.date.day]; // Ensure festival.date.day is always treated as an array
        return days.map(day => {
          return { ...festival, date: { season: festival.date.season, day } };
        });
      });
      return festivalsBySeasonAndDay.sort((a, b) => a.date.day - b.date.day);
    }
  }

  return { npcs, favoriteNpcs, getRandomMarriageCandidate, getNpcBySeason, getFestivalBySeason }
})
