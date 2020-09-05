import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }

  addPlayer(index){
    this.data.players.push({
      name:"Player "+ index
    })
  }

  done(){
    this.dialogRef.close(this.data)
  }
}
