
export class Game {
  date: Date;
  typeGame: String;
  entree: number;
  sortie: number;
  resultat: number;
  isTransfert: boolean;

  constructor(date: Date, typeGame: String, entree: number, sortie: number, isTransfert: boolean) {
    this.date = date;
    this.typeGame = typeGame;
    this.entree = entree;
    this.sortie = sortie;
    const resultat = sortie - entree;
    this.resultat  = Math.round(resultat * 100) / 100;
    this.isTransfert = isTransfert;
  }
}
