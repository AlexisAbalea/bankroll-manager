import { Component, OnInit } from '@angular/core';
import { Bankroll } from '../models/bankroll.model';
import { Game } from '../models/game.model';
import { Serie, Stats } from '../models/stats.model';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  datagraph: Stats[];
  datagraphCG: Stats[];
  datagraphTournois: Stats[];
  datagraphExpresso: Stats[];
  datachiffre: Serie[];
  constructor(private bankrollService: BankrollService) {

  }

  ngOnInit(): void {
    const bankroll = this.bankrollService.bankroll;
    this.datagraph = this.getDataGraph(bankroll);
    this.datachiffre = this.getDataChiffre(bankroll);
    this.datagraphCG = this.getDataGraphFilter(bankroll, 'Cash game');
    this.datagraphTournois = this.getDataGraphFilter(bankroll, 'Tournois');
    this.datagraphExpresso = this.getDataGraphFilter(bankroll, 'Expresso');
  }

  getDataGraph(bankroll: Bankroll): Stats[] {
    const listeStats: Stats[] = [];
    if (bankroll && bankroll.games.length > 0) {
      listeStats.push(this.bankrollService.fromGameToStats());
      listeStats.push(this.getVariance(bankroll));
    }
    return listeStats;
  }

  getDataGraphFilter(bankroll: Bankroll, nomData): Stats[] {
    const listeStats: Stats[] = [];
    if (bankroll && bankroll.games.length > 0) {
      listeStats.push(this.filterDataGraph(bankroll, nomData));
    }
    return listeStats;
  }

  filterDataGraph(bankroll: Bankroll, nomData: string): Stats {
    const stats: Stats = new Stats();
    stats.name = nomData;
    stats.series = [];
    const listeGame = this.bankrollService.sortDateCroissant(bankroll.games)
      .filter(val => val.typeGame === nomData);
    let value = bankroll.miseDepart;
    const serieDepart = new Serie();
    serieDepart.name = '0';
    serieDepart.value = value;
    stats.series.push(serieDepart);
    listeGame.forEach((game) => {
      const serie = new Serie();
      serie.name = game.id;
      value = value + game.resultat;
      serie.value =  Math.round(value * 100) / 100;
      stats.series.push(serie);
    });
    return stats;
  }

  getVariance(bankroll: Bankroll) {
    const stats: Stats = new Stats();
    stats.name = 'Gain espéré';
    stats.series = [];

    const depart: Serie = new Serie();
    depart.name = '0';
    depart.value = bankroll.miseDepart;
    stats.series.push(depart);

    const objectif: Serie = new Serie();
    objectif.name = '99999';
    objectif.value = bankroll.objectif;
    stats.series.push(objectif);

    return stats;
  }

  getDataChiffre(bankroll: Bankroll): Serie[] {
    const listeSeries: Serie[] = [];
    if (bankroll && bankroll.games.length > 0) {
      listeSeries.push(this.getNbrPartie(bankroll.games));
      listeSeries.push(this.getMontantBankroll(bankroll.games));
      listeSeries.push(this.getBenefices(bankroll.games));
      listeSeries.push(this.getTransactionAjout(bankroll.games));
      listeSeries.push(this.getTransactionRetire(bankroll.games));
      //listeSeries.push(this.getGainTournois(bankroll));
      //listeSeries.push(this.getGainCashGame(bankroll));
      //listeSeries.push(this.getGainExpresso(bankroll));
      listeSeries.push(this.getPourcentageObjectif(bankroll.objectif, this.bankrollService.getMontantBankroll(bankroll.games)));
    }
    return listeSeries;
  }

  getMontantBankroll(bankroll: Game[]) {
    const serie = new Serie();
    serie.name = "Montant bankroll";
    serie.value = this.bankrollService.getMontantBankroll(bankroll);
    return serie;
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
    const valeur = bankrollTransfert.reduce((a, b) => a + b.entree, 0);
    serie.value = Math.round(valeur * 100) / 100;
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
    serie.value = Math.round(valeur * 100) / 100;
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
    serie.value = Math.round(valeur * 100) / 100;
    return serie;
  }

  getGainCashGame(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Gain Cash Game";
    let valeur = 0;
    bankroll.forEach(val => {
      if (val.typeGame === 'Cash Game') {
        valeur = valeur + val.resultat;
      }
    });
    serie.value = Math.round(valeur * 100) / 100;
    return serie;
  }

  getGainExpresso(bankroll: Game[]): Serie {
    const serie = new Serie();
    serie.name = "Gain Expresso";
    let valeur = 0;
    bankroll.forEach(val => {
      if (val.typeGame === 'Expresso') {
        valeur = valeur + val.resultat;
      }
    });
    serie.value = Math.round(valeur * 100) / 100;
    return serie;
  }

  getPourcentageObjectif(montantObjectif: number, montantBankroll: number): Serie {
    const serie = new Serie();
    serie.name = "% Objectif";
    const valeur = (montantBankroll * 100) / montantObjectif;
    serie.value = Math.round(valeur * 100) / 100;
    return serie;
  }

}
