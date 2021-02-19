import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Serie, Stats } from '../models/stats.model';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class BankrollService {

  bankroll: Game[] = [];
  miseDepart: number;

  constructor() {
    this.addMockGame();
  }

  addBankroll(newGame: Game) {
    this.bankroll.push(newGame);
    this.bankroll = this.sortDateDecroissant(this.bankroll);
  }

  fromGameToStats(): Stats {
    const stats: Stats = new Stats();
    stats.name = '€';
    stats.series = [];
    if (this.bankroll && this.bankroll.length) {
      const listeGame = this.sortDateCroissant(this.bankroll);
      let value = 0;
      listeGame.forEach(game => {
        const serie = new Serie();
        serie.name = dayjs(game.date).format('DD/MM/YYYY');
        value = value + game.resultat;
        serie.value = value;
        stats.series.push(serie);
      });
    }
    return stats;
  }

  sortDateDecroissant(array: Game[]) {
   return array.sort((a, b) => { return b.date.getTime() - a.date.getTime()});
  }

  sortDateCroissant(array: Game[]) {
    return array.sort((a, b) => { return a.date.getTime() - b.date.getTime()});
  }


  addMockGame() {
    let gameMock = new Game(new Date(2016,1,1), 'Dépôt', 0, 150, true);
    let gameMock1 = new Game(new Date(2017, 2, 5), 'Tournois', 10, 15.50, false);
    let gameMock2 = new Game(new Date(2018, 3, 5), 'Cash game', 13.50, 8.21, false);
    let gameMock3 = new Game(new Date(2019, 4, 5), 'Cash game', 10, 9.21, false);
    let gameMock4 = new Game(new Date(2020, 1, 1 ), 'Tournois', 35, 21, false);
    let gameMock5 = new Game(new Date(2020, 3, 5), 'Cash game', 40, 150, false);
    let gameMock6 = new Game(new Date(2021, 1, 1), 'Cash game', 30, 60, false);
    let gameMock7 = new Game(new Date(2021, 2, 16), 'Retrait', 20, 0, true);
    const mockGames = [gameMock, gameMock1, gameMock2, gameMock3, gameMock4, gameMock5, gameMock6, gameMock7];
    this.bankroll.push(...mockGames);
    this.bankroll = this.sortDateDecroissant(this.bankroll);
  }

  getMontantInvesti(bankroll: Game[]): number {
    const bankrollTransfert = bankroll.filter(val => {
      return val.isTransfert && val.sortie > 0;
    });
    return bankrollTransfert.reduce((a, b) => a + b.sortie, 0);
  }

  getMontantBankroll(bankroll: Game[]): number {
    return bankroll.reduce((a, b) => a + b.resultat, 0);
  }

}
