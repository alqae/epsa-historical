import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinesRoutingModule } from './lines-routing.module';
import { LinesComponent } from './components/lines.component';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    LinesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    LinesRoutingModule
  ],
})
export class LinesModule { }
