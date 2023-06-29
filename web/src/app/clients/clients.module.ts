import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './components/clients.component';
import { SharedModule } from '@app/shared';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
