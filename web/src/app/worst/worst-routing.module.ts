import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorstComponent } from './components/worst.component';

const routes: Routes = [
  {
    path: '',
    component: WorstComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorstRoutingModule { }
