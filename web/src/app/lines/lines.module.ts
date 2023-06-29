import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LinesRoutingModule } from './lines-routing.module';
import { LinesComponent } from './components/lines.component';
import { LinesService } from './services/lines.service';
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
  providers: [
    LinesService,
  ]
})
export class LinesModule { }
