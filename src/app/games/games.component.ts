import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ModalModifierGameComponent } from '../modals/modal-modifier-game/modal-modifier-game.component';
import { ModalParameterBankrollComponent } from '../modals/modal-parameter-bankroll/modal-parameter-bankroll.component';
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
  types = ['Tournois', 'Cash game', 'Expresso'];

  filteredGames: any[] = []

  defaultRecords: any = 10;
  pageEvent :any;


  constructor(private _adapter: DateAdapter<any>,
              private formBuilder: FormBuilder,
              private router: Router,
              private serviceBankroll: BankrollService,
              public dialog: MatDialog,
              private matPaginatorIntl: MatPaginatorIntl) {
    this._adapter.setLocale('fr');
  }

  ngOnInit(): void {
    this.bankroll = this.serviceBankroll.bankroll;
    this.getGames();
    this.initForm();
    this.setPaginator();
  }

  setPaginator() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Nombre de partie par page';
    this.matPaginatorIntl.nextPageLabel = 'Page suivante';
    this.matPaginatorIntl.previousPageLabel = 'Page précédente';
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      date: [new Date(), Validators.required],
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
        this.majBankrollGame();
      }, error => {
        console.log(error);
      });
      this.resetFormGame();
    }
  }

  getGames() {
    if (this.serviceBankroll.bankroll.games.length > 0) {
      this.majBankrollGame();
    } else {
      this.serviceBankroll.getGamesFromBankroll().subscribe(val => {
        if (val) {
          this.serviceBankroll.setGameFromBdd(val);
          this.majBankrollGame();
        }
      });
    }
  }

  majBankrollGame() {
    this.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
    this.filteredGames = this.games.slice(0, this.defaultRecords);
    this.majMontant();
  }

  onPaginateChange(data) {
    const startIndex = this.defaultRecords * data.pageIndex;
    this.filteredGames = this.games.slice(startIndex, startIndex + data.pageSize);
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
        this.majBankrollGame();
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
      if (result) {
        this.ajouterTransaction(result);
      }
    });
  }

  openDialogConfigBankroll(): void {
    const dialogRef = this.dialog.open(ModalParameterBankrollComponent, {
      width: '500px',
      height: '450px',
      data: {
        bankroll: this.bankroll
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.suppression) {
        this.serviceBankroll.deleteBankrollBdd(this.bankroll.id).then(val => {
          this.serviceBankroll.bankroll = null;
          this.router.navigate(['/bm/bankroll']);
        });
      }
      if (result) {
        this.serviceBankroll.updateBankrollBdd(result.data.bankroll).then(val => {
          this.bankroll.nom = result.data.bankroll.nom;
          this.bankroll.objectif = result.data.bankroll.objectif;
          this.bankroll.miseDepart = result.data.bankroll.miseDepart;
          this.bankroll.description = result.data.bankroll.description;
          this.serviceBankroll.bankroll = this.bankroll;
          const index = this.serviceBankroll.listeBankroll.findIndex(bankroll => {
            return bankroll.id === this.bankroll.id;
          });
          if (index >= 0) {
            this.serviceBankroll.listeBankroll[index] = this.bankroll;
          }
        });
      }
    });
  }

  openDialogSuppression(game: Game): void {
    const dialogRef = this.dialog.open(ModalSuppressionComponent, {
      width: '320px',
      height: '150px',
      data: {
        titre: 'partie',
        id: game.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.supprimerGame(result.id);
      }
    });
  }

  openDialogModifier(game: Game): void {
    const dialogRef = this.dialog.open(ModalModifierGameComponent, {
      width: '500px',
      height: '450px',
      data: {
        game: game
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data && result.data.game) {
        const resultGame = result.data.game;
        const gameMaj = new Game(resultGame.date, resultGame.typeGame, resultGame.entree, resultGame.sortie, game.isTransfert, game.idBankroll);
        gameMaj.id = game.id;
        this.serviceBankroll.updateGame(gameMaj).subscribe(val => {
          const index = this.serviceBankroll.bankroll.games.findIndex(game => {
            return game.id === gameMaj.id;
          });
          game = gameMaj;
          this.serviceBankroll.bankroll.games[index] = gameMaj;
          this.majBankrollGame();
        }, error => {
          console.log(error);
        });
      }
    });
  }

  supprimerGame(id: string) {
    this.serviceBankroll.deleteGame(id).subscribe(val => {
      this.games = this.games.filter(x => {
        return x.id !== id;
      });
      this.serviceBankroll.bankroll.games = this.games;
      this.majBankrollGame();
    }, err => {
      console.log('echec de la suppression');
    });
  }

  resetFormGame() {
    this.gameForm.reset();
    this.gameForm.get('date').setValue(new Date());
  }
}


export interface DialogData {
  id: string;
  titre: string;
  data: number;
  date: Date;
  isChecked: boolean;
  bankroll: Bankroll;
  game: Game;
}
