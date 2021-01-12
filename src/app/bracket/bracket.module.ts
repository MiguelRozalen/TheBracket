import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BracketRoutingModule } from './bracket-routing.module';
import { BracketComponent } from './bracket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { TruncatePipe } from '../shared/truncate.pipe';
import { JsonService } from '../shared/json.service';

@NgModule({
  declarations: [
    BracketComponent,
    ResultDialogComponent,
    NewDialogComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    BracketRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
  ],
  entryComponents: [
    ResultDialogComponent,
    NewDialogComponent
  ],
})
export class BracketModule { }
