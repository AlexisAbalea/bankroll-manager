import { Game } from "./game.model";

export class Bankroll {
  id: string;
  nom: string;
  description: string;
  objectif: number;
  miseDepart: number;
  uid: string;
  games: Game[] = [];
}
