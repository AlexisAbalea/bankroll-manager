import * as dayjs from 'dayjs'

export class Game {
  date: String;
  typeGame: String;
  entree: number;
  sortie: number;
  resultat: number;

  constructor(date: String, typeGame: String, entree: number, sortie: number) {
    this.date = date;
    this.typeGame = typeGame;
    this.entree = entree;
    this.sortie = sortie;
    this.resultat = sortie - entree;
  }
}
