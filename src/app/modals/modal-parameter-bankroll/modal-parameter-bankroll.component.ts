import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/games/games.component';
import { Bankroll } from 'src/app/models/bankroll.model';
import { ModalSuppressionComponent } from '../modal-suppression/modal-suppression.component';

@Component({
  selector: 'app-modal-parameter-bankroll',
  templateUrl: './modal-parameter-bankroll.component.html',
  styleUrls: ['./modal-parameter-bankroll.component.scss']
})
export class ModalParameterBankrollComponent {
  bankrollParam: Bankroll = new Bankroll();
  constructor(
    public dialogRef: MatDialogRef<ModalParameterBankrollComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
      this.bankrollParam.nom = this.data.bankroll.nom;
      this.bankrollParam.description = this.data.bankroll.description;
      this.bankrollParam.objectif = this.data.bankroll.objectif;
      this.bankrollParam.miseDepart = this.data.bankroll.miseDepart;
      this.bankrollParam.id = this.data.bankroll.id;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  supprimerBankroll() {
    const dialogRef = this.dialog.open(ModalSuppressionComponent, {
      width: '350px',
      height: '160px',
      data: {
        titre: 'bankroll',
        id: this.bankrollParam.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.id) {
        this.dialogRef.close({suppression: true});
      }
    });
  }

}
