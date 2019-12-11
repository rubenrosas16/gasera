import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {

  usuario: any;
  cargado = false;
  datosPedidos : any;
  pedidos : any;
  constructor(
    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage

  ) { }

  ngOnInit() {
    this.storage.get('usuario').then((data)=>{
      this.usuario=data;
      this.usuario.tipoMov = 'PedidosPendientes';
      console.log(this.usuario);
      this.serv.postData(this.usuario).then((data2)=>{
        console.log(data2);
        this.datosPedidos = data2;
        this.pedidos = this.datosPedidos.result;
        this.cargado = true;
      });
    });


  }

}
