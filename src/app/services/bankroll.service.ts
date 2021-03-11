import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Serie, Stats } from '../models/stats.model';
import * as dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bankroll } from '../models/bankroll.model';

@Injectable({
  providedIn: 'root'
})
export class BankrollService {

  SERVER = environment.urlAddress;
  bankroll: Bankroll;
  miseDepart: number;
  listeBankroll: Bankroll[] = [];

  constructor(private http: HttpClient) {

  }

  /* ************* BANKROLL ********************* */

  getBankroll(userId): Observable<any> {
    return this.http.get(this.SERVER + '/api/bankroll/' + userId);
  }

  createBankrollBdd(bankroll: Bankroll) {
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.SERVER + '/api/bankroll', { bankroll: bankroll })
        .subscribe(retour => {
            if (retour.id) {
              bankroll.id = retour.id.toString();
              this.listeBankroll.push(bankroll);
            }
            resolve(retour);
          }, (error) => {
            reject(error);
          }
        );
    });
  }

  updateBankrollBdd(bankroll: Bankroll) {
    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>(this.SERVER + '/api/bankroll', { bankroll })
        .subscribe(retour => {
            resolve(retour);
          }, (error) => {
            reject(error);
          }
        );
    });
  }

  deleteBankrollBdd(id) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete(this.SERVER + '/api/bankroll/' + id)
        .subscribe((retour) => {
            resolve();
          }, (error) => {
            reject(error);
          }
        );
    });
  }

  /* ************* GAMES ********************* */

  getGamesFromBankroll() {
    return this.http.get(this.SERVER + '/api/games/' + this.bankroll.id);
  }

  addGame(newGame: Game) {
    return this.http.post<any>(this.SERVER + '/api/games', newGame);
  }

  deleteGame(idGame: string) {
    return this.http.delete(this.SERVER + '/api/games/' + idGame);
  }

  updateGame(game: Game) {
    return this.http.patch(this.SERVER + '/api/games/', {game: game});
  }

  setGameFromBdd(valeur) {
    valeur.forEach(element => {
      const game = new Game(new Date(element.date), element.type, element.entree, element.sortie, element.isTransfert, element.idBankroll);
      game.id = element.id.toString();
      this.bankroll.games.push(game);
    });
  }


  /* ************* UTILITAIRE ********************* */

  fromGameToStats(): Stats {
    const stats: Stats = new Stats();
    stats.name = 'Bankroll';
    stats.series = [];
    if (this.bankroll && this.bankroll.games.length) {
      const listeGame = this.sortDateCroissant(this.bankroll.games);
      let value = 0;
      listeGame.forEach((game, index) => {
        const serie = new Serie();
        // serie.name = index.toString() + '_' + dayjs(game.date).format('DD/MM/YYYY') + '_' + game.typeGame + '_' + game.resultat;
        serie.name = index.toString();
        value = value + game.resultat;
        serie.value =  Math.round(value * 100) / 100;
        stats.series.push(serie);
      });
    }
    return stats;
  }

  sortDateDecroissant(array: Game[]) {
   return array.sort((a, b) => {
     if (b.date.getTime() === a.date.getTime()) {
       return parseInt(b.id) - parseInt(a.id);
     }
     return b.date.getTime() - a.date.getTime()
    });
  }

  sortDateCroissant(array: Game[]) {
    return array.sort((a, b) => {
      if (b.date.getTime() === a.date.getTime()) {
        return parseInt(a.id) - parseInt(b.id);
      }
      return a.date.getTime() - b.date.getTime()
    });
  }

  getMontantInvesti(games: Game[]): number {
    const bankrollTransfert = games.filter(val => {
      return val.isTransfert && val.sortie > 0;
    });
    const valeur = bankrollTransfert.reduce((a, b) => a + b.sortie, 0);
    return Math.round(valeur * 100) / 100;
  }

  getMontantBankroll(games: Game[]): number {
    const resultat = games.reduce((a, b) => a + b.resultat, 0);
    return Math.round(resultat * 100) / 100;
  }

}
