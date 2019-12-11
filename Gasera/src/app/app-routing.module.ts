import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'listado-gaseras', loadChildren: './paginas/listado-gaseras/listado-gaseras.module#ListadoGaserasPageModule' },
  { path: 'registrarse', loadChildren: './paginas/registrarse/registrarse.module#RegistrarsePageModule' },
  { path: 'cambio-password', loadChildren: './paginas/cambio-password/cambio-password.module#CambioPasswordPageModule' },
  { path: 'menu', loadChildren: './paginas/menu/menu.module#MenuPageModule' },
  { path: 'pedir', loadChildren: './paginas/pedir/pedir.module#PedirPageModule' },
  { path: 'mis-pedidos', loadChildren: './paginas/mis-pedidos/mis-pedidos.module#MisPedidosPageModule' },
  { path: 'pedidos-pendientes', loadChildren: './paginas/pedidos-pendientes/pedidos-pendientes.module#PedidosPendientesPageModule' },
  { path: 'grfica-pedidos', loadChildren: './paginas/grfica-pedidos/grfica-pedidos.module#GrficaPedidosPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
