export interface Birthday {
  season: number;
  day: number;
}

export interface NPC {
  id: number;
  name: string;
  gender: number;
  marageable: boolean;
  birthday: Birthday;
}
