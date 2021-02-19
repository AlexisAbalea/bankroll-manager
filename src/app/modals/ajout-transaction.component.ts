import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'ajout-transaction',
  templateUrl: 'ajout-transaction.component.html',
  styleUrls: ['./ajout-transaction.component.scss']
})
export class AjoutTransactionDialog {
  data: number;
  date: Date = new Date();
  isChecked = false;
  constructor(
    public dialogRef: MatDialogRef<AjoutTransactionDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
