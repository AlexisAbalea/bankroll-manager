import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/games/games.component';

@Component({
  selector: 'app-modal-suppression',
  templateUrl: './modal-suppression.component.html',
  styleUrls: ['./modal-suppression.component.scss']
})
export class ModalSuppressionComponent {

  constructor(public dialogRef: MatDialogRef<ModalSuppressionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
