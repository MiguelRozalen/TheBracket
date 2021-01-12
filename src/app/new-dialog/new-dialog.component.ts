import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent implements OnInit {

  numberOfPlayers: number = 4

  constructor(public dialogRef: MatDialogRef<NewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    //According to https://medium.com/better-programming/expressionchangedafterithasbeencheckederror-in-angular-what-why-and-how-to-fix-it-c6bdc0b22787
    setTimeout(() => {
      this.generatePlayers()
    })
  }

  generatePlayers() {
    this.data.players = []
    while (this.data.players.length < this.numberOfPlayers) {
      this.data.players.push({
        name: "P " + (this.data.players.length + 1)
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
