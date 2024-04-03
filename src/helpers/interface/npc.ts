export interface Birthday {
  season: number;
  day: number;
}

export interface NPC {
  id: number;
  name: string;
  gender: number;
  marriageable: boolean;
  date: Birthday;
}
