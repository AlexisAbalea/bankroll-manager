import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bankroll } from '../models/bankroll.model';
import { Game } from '../models/game.model';
import { AuthService } from '../services/auth.service';
import { BankrollService } from '../services/bankroll.service';

@Component({
  selector: 'app-bankroll-menu',
  templateUrl: './bankroll-menu.component.html',
  styleUrls: ['./bankroll-menu.component.scss']
})
export class BankrollMenuComponent implements OnInit {

  constructor(private serviceBankroll: BankrollService,
              private router: Router,
              private formBuilder: FormBuilder,
              private serviceAuth: AuthService) { }

  ajouterClicked: boolean;
  bankrollForm: FormGroup;
  listeBankroll: Bankroll[] = [];

  ngOnInit(): void {
    this.getBankroll();
    this.initForm();
  }

  initForm() {
    this.bankrollForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: [''],
      miseDepart: [''],
      objectif: [''],
    });
  }

  getBankroll() {
    this.serviceBankroll.getBankroll(this.serviceAuth.user.id).subscribe(bankrollBdd => {
      if (bankrollBdd) {
        bankrollBdd.forEach(element => {
          const bankroll = new Bankroll();
          bankroll.id = element.id;
          bankroll.nom = element.nom;
          bankroll.description = element.description;
          bankroll.miseDepart = element.miseDepart;
          bankroll.objectif = element.objectif;
          this.listeBankroll.push(bankroll);
        });
      }
    }, error => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }

  chooseBankroll(bankroll: Bankroll) {
    this.serviceBankroll.bankroll = bankroll;
    this.router.navigate(['/bm/games']);
  }

  ajouterBankroll() {
    this.ajouterClicked = true;
    this.bankrollForm.markAllAsTouched();
    if (this.bankrollForm.valid) {
      const formValue = this.bankrollForm.value;
      const newBankroll = new Bankroll();
      newBankroll.nom = formValue['nom'];
      newBankroll.description = formValue['description'];
      newBankroll.objectif = formValue['objectif'];
      newBankroll.miseDepart = formValue['miseDepart'];
      newBankroll.uid = this.serviceAuth.user.id;
      this.serviceBankroll.createBankrollBdd(newBankroll).then(succes => {
        console.log('id :', succes.id);
        newBankroll.id = succes.id;
        this.listeBankroll.push(newBankroll);
        this.addFirstGame(newBankroll);
      }).catch(err => {
        // toast erreur
        console.log(err);
      }) ;
      this.bankrollForm.reset();
    }

  }

  addFirstGame(bankroll: Bankroll) {
    if (bankroll.miseDepart) {
      const transaction = new Game(
        new Date(),
        'Dépôt',
        0,
        bankroll.miseDepart,
        true,
        bankroll.id
      );
      this.serviceBankroll.addGame(transaction).subscribe(retour => {
        console.log(retour);
        /*
        transaction.id = retour.id;
        this.serviceBankroll.bankroll.games.push(transaction);
        this.serviceBankroll.bankroll.games = this.serviceBankroll.sortDateDecroissant(this.serviceBankroll.bankroll.games);
        this.majMontant();
        */
      }, error => {
        console.log(error);
      });
    }
  }
}
