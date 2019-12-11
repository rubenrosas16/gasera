import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisPedidosPage } from './mis-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MisPedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisPedidosPage]
})
export class MisPedidosPageModule {}
