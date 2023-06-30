import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinesComponent } from './components/lines.component';

const routes: Routes = [
  {
    path: '',
    component: LinesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
