import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/games/games.component';

@Component({
  selector: 'app-modal-modifier-game',
  templateUrl: './modal-modifier-game.component.html',
  styleUrls: ['./modal-modifier-game.component.scss']
})
export class ModalModifierGameComponent {

  gameForm: FormGroup;
  ajouterClicked: boolean;
  types = ['Tournois', 'Cash game', 'Expresso'];

  constructor(
    public dialogRef: MatDialogRef<ModalModifierGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
    ) {
      this.gameForm = this.formBuilder.group({
        date: [data.game.date, Validators.required],
        typeGame: [data.game.typeGame, Validators.required],
        entree: [data.game.entree, Validators.required],
        sortie: [data.game.sortie, Validators.required]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
