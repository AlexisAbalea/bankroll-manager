import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { Serie, Stats } from '../models/stats.model';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  datagraph: Stats;
  datachiffre: Serie[];
  constructor(private bankrollService: BankrollService) {

  }

  ngOnInit(): void {
    this.datagraph = this.bankrollService.fromGameToStats();
    this.datachiffre = this.getDataChiffre();
  }

  getDataChiffre(): Serie[] {
    const bankroll = this.bankrollService.bankroll.games;
    const listeSeries: Serie[] = [];
    if (bankroll && bankroll.length > 0) {
      listeSeries.push(this.getNbrPartie(bankroll));
      listeSeries.push(this.getBenefices(bankroll));
      listeSeries.push(this.getTransactionAjout(bankroll));
      listeSeries.push(this.getTransactionRetire(bankroll));
      listeSeries.push(this.getGainTournois(bankroll));
      listeSeries.push(this.getGainCashGame(bankroll));
    }
    return listeSeries;
  }

  getTransactionAjout(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Montant investi";
    serie.value = this.bankrollService.getMontantInvesti(bankroll);
    return serie;
  }

  getTransactionRetire(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Montant retiré";
    const bankrollTransfert = bankroll.filter(val => {
      return val.isTransfert && val.entree > 0;
    });
    serie.value = bankrollTransfert.reduce((a, b) => a + b.entree, 0);
    return serie;
  }

  getNbrPartie(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Partie jouée";
    const bankrollSansTransfert = bankroll.filter(val => {
      return !val.isTransfert;
    });
    serie.value = bankrollSansTransfert.length;
    return serie;
  }

  getBenefices(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Bénéfice";
    let valeur = 0;
    bankroll.forEach(val => {
      if (!val.isTransfert) {
        valeur = valeur + val.resultat;
      }
    });
    serie.value = valeur;
    return serie;
  }

  getGainTournois(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Gain Tournois";
    let valeur = 0;
    bankroll.forEach(val => {
      if (val.typeGame === 'Tournois') {
        valeur = valeur + val.resultat;
      }
    });
    serie.value = valeur;
    return serie;
  }

  getGainCashGame(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Gain Cash Game";
    let valeur = 0;
    bankroll.forEach(val => {
      if (val.typeGame === 'Cash game') {
        valeur = valeur + val.resultat;
      }
    });
    serie.value = valeur;
    return serie;
  }

}
