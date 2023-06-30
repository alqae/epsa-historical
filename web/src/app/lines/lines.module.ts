import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinesGraphComponent } from './components/lines-graph/lines-graph.component';
import { LinesRoutingModule } from './lines-routing.module';
import { LinesComponent } from './components/lines.component';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    LinesComponent,
    LinesGraphComponent
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
