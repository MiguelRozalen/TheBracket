import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //According to https://medium.com/better-programming/expressionchangedafterithasbeencheckederror-in-angular-what-why-and-how-to-fix-it-c6bdc0b22787
    setTimeout(() => {
      if (this.data.match.resultA.length <= 0) {
        this.data.match.resultA = new Array(this.data.bracket.bestOf)
      }
      if (this.data.match.resultB.length <= 0) {
        this.data.match.resultB = new Array(this.data.bracket.bestOf)
      }
    })
  }

  cmpare(index) {
    return index;
  }
}
