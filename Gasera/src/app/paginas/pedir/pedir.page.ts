import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {

  form = {
    usuario:null,
    idGasera: null,
    pass: null,
    cantidad: null,
    direccion: null,
    tipoMov : 'pedir'
  };
  formCorrecto = true;
  mensaje = '';
  gaseras : any;
  usuario: any;
  cargado = false;
  datosGaseras : any;
  datosPedido : any;
  constructor(

    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage

  ) { }

  ngOnInit() {
    
    this.storage.get('usuario').then((data)=>{
      this.usuario=data;
      this.usuario.tipoMov = 'getGaseras';
      console.log(this.usuario);
      this.serv.postData(this.usuario).then((data2)=>{
        console.log(data2);
        this.datosGaseras = data2;
        this.gaseras = this.datosGaseras.result;
        this.cargado = true;
      });
    });
  }


  async pedido(fPedido: NgForm) {
    
    if (fPedido.invalid) {   
      this.mensaje = "Ingrese los datos para pedir.";
      this.formCorrecto = false;
      return;
    }

    this.form.usuario = this.usuario.usuario;
    this.form.pass = this.usuario.pass;

    this.datosPedido = await this.serv.postData(this.form);
    console.log(this.datosPedido);
    if (this.datosPedido.success) {
      this.navCtrl.navigateRoot('menu', { animated: true });
      this.formCorrecto = true;
    } else {
      this.mensaje = this.datosPedido.msg;
      this.formCorrecto = false;
    }

  }

}
