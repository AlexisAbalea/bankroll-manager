import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuppressionComponent } from '../modals/modal-suppression/modal-suppression.component';
import { AjoutTransactionDialog } from '../modals/modal-transaction/ajout-transaction.component';
import { Bankroll } from '../models/bankroll.model';
import { Game } from '../models/game.model';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  bankroll: Bankroll;
  gameForm: FormGroup;
  ajouterClicked: boolean;
  montantBankroll: number;

  games: Game[] = [];
  types = ['Tournois', 'Cash game'];

  constructor(private _adapter: DateAdapter<any>,
              private formBuilder: FormBuilder,
              private serviceBankroll: BankrollService,
              public dialog: MatDialog) {
    this._adapter.setLocale('fr');
  }

  ngOnInit(): void {
    this.bankroll = this.serviceBankroll.bankroll;
    this.getGames();
    this.initForm();
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      miseEntree: ['', Validators.required],
      miseSortie: ['', Validators.required]
    });
  }

  ajouterGame() {
    this.ajouterClicked = true;
    this.gameForm.markAllAsTouched();
    if (this.gameForm.valid) {
      const formValue = this.gameForm.value;
      const newGame = new Game(
        formValue['date'],
        formValue['type'],
        formValue['miseEntree'],
        formValue['miseSortie'],
        false,
        this.serviceBankroll.bankroll.id
      );
      this.serviceBankroll.addGame(newGame).subscribe(retour => {
        newGame.id = retour.id;
        this.serviceBankroll.bankroll.games.push(newGame);
        this.serviceBankroll.bankroll.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
        this.majMontant();
      }, error => {
        console.log(error);
      });
      this.gameForm.reset();
    }
  }

  getGames() {
    if (this.serviceBankroll.bankroll.games.length > 0) {
      this.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
      this.majMontant();
    } else {
      this.serviceBankroll.getGamesFromBankroll().subscribe(val => {
        if (val) {
          this.serviceBankroll.setGameFromBdd(val);
          this.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
          this.majMontant();
        }
      });
    }
  }

  majMontant() {
    this.montantBankroll = this.serviceBankroll.getMontantBankroll(this.games);
  }

  formatDate(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  ajouterTransaction(result: DialogData) {
    if (result.data) {
      const transaction = new Game(
        result.date,
        result.isChecked ? 'Retrait' : 'Dépôt',
        result.isChecked ? result.data : 0,
        result.isChecked ? 0 : result.data,
        true,
        this.serviceBankroll.bankroll.id
      );
      this.serviceBankroll.addGame(transaction).subscribe(retour => {
        transaction.id = retour.id;
        this.serviceBankroll.bankroll.games.push(transaction);
        this.serviceBankroll.bankroll.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
        this.majMontant();
      }, error => {
        console.log(error);
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutTransactionDialog, {
      width: '500px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ajouterTransaction(result);
    });
  }

  openDialogSuppression(game: Game): void {
    console.log(game);
    const dialogRef = this.dialog.open(ModalSuppressionComponent, {
      width: '320px',
      height: '150px',
      data: {
        id: game.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.supprimerGame(result.id);
      }
    });
  }

  supprimerGame(id: string) {
    this.serviceBankroll.deleteGame(id).subscribe(val => {
      this.games = this.games.filter(x => {
        return x.id !== id;
      });
      this.serviceBankroll.bankroll.games = this.games;
    }, err => {
      console.log('echec de la suppression');
    });
  }
}

export interface DialogData {
  id: string;
  data: number;
  date: Date;
  isChecked: boolean;
}
