import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { MaterialModule } from './material/material.module';

import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromPipes from './pipes';

@NgModule({
  declarations: [
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class SharedModule { }
