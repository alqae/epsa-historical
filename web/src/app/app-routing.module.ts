import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'lines',
    loadChildren: () => import('src/app/lines/lines.module').then(m => m.LinesModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('src/app/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'worst',
    loadChildren: () => import('src/app/worst/worst.module').then(m => m.WorstModule)
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
