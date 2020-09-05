import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResultDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if(this.data.match.resultA.length<=0){
      this.data.match.resultA = new Array(this.data.championship.bestOf)
    }
    if(this.data.match.resultB.length<=0){
      this.data.match.resultB= new Array(this.data.championship.bestOf)
    }
  }

  cmpare(index) {
    return index;
  }
}
