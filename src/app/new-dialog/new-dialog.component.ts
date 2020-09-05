import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent implements OnInit {

  numberOfPlayers: number = 4
  constructor(public dialogRef: MatDialogRef<NewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.generatePlayers()
  }

  generatePlayers() {
    this.data.players = []
    while (this.data.players.length < this.numberOfPlayers) {
      this.data.players.push({
        name: "Player " + (this.data.players.length+1)
      })
    }
  }

  addPlayer() {
    this.numberOfPlayers++;
  }

  done() {
    this.dialogRef.close(this.data)
  }
}
