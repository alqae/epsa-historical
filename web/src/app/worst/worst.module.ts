import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorstRoutingModule } from './worst-routing.module';
import { WorstComponent } from './components/worst.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
    WorstComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    WorstRoutingModule
  ]
})
export class WorstModule { }
