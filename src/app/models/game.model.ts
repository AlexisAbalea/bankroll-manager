
export class Game {
  id: string;
  date: Date;
  typeGame: String;
  entree: number;
  sortie: number;
  resultat: number;
  isTransfert: boolean;
  idBankroll: string;

  constructor(date: Date, typeGame: String, entree: number, sortie: number, isTransfert: boolean, idBankroll: string) {
    this.date = date;
    this.typeGame = typeGame;
    this.entree = entree;
    this.sortie = sortie;
    const resultat = sortie - entree;
    this.resultat  = Math.round(resultat * 100) / 100;
    this.isTransfert = isTransfert;
    this.idBankroll = idBankroll;
  }
}
