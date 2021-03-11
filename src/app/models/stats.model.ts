export class Stats {
  id: string;
  name: String;
  series: Serie[];
}

export class Serie {
  name: Date | string;
  value: number;
}
