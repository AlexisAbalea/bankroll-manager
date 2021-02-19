import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.scss']
})
export class AlerteComponent implements OnInit {

  titre: string;
  montant: number;
  commentaire: string;

  listeAlerte: Alerte[] = [];

  constructor() { }

  ngOnInit(): void {
    this.mockAlerte();
  }

  mockAlerte() {
    const alerte: Alerte = {'titre': 'Test 1', 'montant': 50, 'commentaire': 'test commentaire 1' };
    const alerte2: Alerte = {'titre': 'Test2', 'montant': 10, 'commentaire': 'test commentaire 2' };
    const alerte3: Alerte = {'titre': 'Test3', 'montant': 100, 'commentaire': 'test commentaire 3' };
    this.listeAlerte.push(...[alerte, alerte2, alerte3]);
  }

  ajouterAlerte() {
    const alerte: Alerte = {'titre': this.titre, 'montant': this.montant, 'commentaire': this.commentaire };
    this.listeAlerte.push(alerte);
    this.resetForm();
  }

  resetForm() {
    this.titre = '';
    this.montant = null;
    this.commentaire = '';
  }

}

export interface Alerte {
  titre: string,
  montant: number,
  commentaire :string
}
