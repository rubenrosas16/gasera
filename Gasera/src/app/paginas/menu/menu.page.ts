import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  usuario: any;
  cargado = false;

  constructor(

    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage

  ) { }

  ngOnInit() {
    this.usuario = {
      gasera: false
    };
    this.storage.get('usuario').then((data)=>{
      this.usuario=data;
      this.cargado = true;

    });
  }

  Pedir(){
    this.navCtrl.navigateRoot('pedir', { animated: true });
  }

  MisPedidos(){
    this.navCtrl.navigateRoot('mis-pedidos', { animated: true });
  }

  PedidosPendientes(){
    this.navCtrl.navigateRoot('pedidos-pendientes', { animated: true });
  }

  GraficaPedidos(){
    this.navCtrl.navigateRoot('grfica-pedidos', { animated: true });
  }

}
