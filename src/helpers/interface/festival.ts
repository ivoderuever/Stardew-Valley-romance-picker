export interface Dates {
  season: number;
  day: number | number[];
}

export interface Festival {
  id: number;
  name: string;
  eventType: string;
  date: Dates;
}