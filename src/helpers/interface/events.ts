interface dates {
  season: number;
  day: number | number[];
}

interface Festival {
  id: number;
  name: string;
  date: dates;
}