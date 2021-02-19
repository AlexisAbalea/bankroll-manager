import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutTransactionDialog } from '../modals/ajout-transaction.component';
import { Game } from '../models/game.model';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  gameForm: FormGroup;
  ajouterClicked: boolean;
  bankroll: number;

  games: Game[] = [];
  types = ['Tournois', 'Cash game'];

  constructor(private _adapter: DateAdapter<any>,
              private formBuilder: FormBuilder,
              private serviceBankroll: BankrollService,
              public dialog: MatDialog) {
    this._adapter.setLocale('fr');
  }

  ngOnInit(): void {
    this.getGames();
    this.majMontant();
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
        false
      );
      this.serviceBankroll.addBankroll(newGame);
      this.majMontant();
      this.gameForm.reset();
    }
  }

  getGames() {
    this.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll);
  }

  majMontant() {
    this.bankroll = this.serviceBankroll.getMontantBankroll(this.games);
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
        true
      );
      this.serviceBankroll.addBankroll(transaction);
      this.majMontant();
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
}

export interface DialogData {
  data: number;
  date: Date;
  isChecked: boolean;
}
