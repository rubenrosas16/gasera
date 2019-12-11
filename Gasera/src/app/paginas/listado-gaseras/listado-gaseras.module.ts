import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListadoGaserasPage } from './listado-gaseras.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoGaserasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListadoGaserasPage]
})
export class ListadoGaserasPageModule {}
