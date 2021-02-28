import { Game } from "./game.model";

export class Bankroll {
  id: string;
  nom: string;
  description: string;
  objectif: number;
  uid: string;
  games: Game[] = [];
}
