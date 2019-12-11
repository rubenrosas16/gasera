import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.page.html',
  styleUrls: ['./cambio-password.page.scss'],
})
export class CambioPasswordPage implements OnInit {

  formulario = {
    usuario:'',
    password:'',
    tipoMov: 'cambioPass'
  };
  DatosPeticion: any;
  formCorrecto = true;
  mensaje = '';

  constructor(
    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage

  ) { }

  ngOnInit() {
  }

  async cambioPass(fCambioPass: NgForm) {
    if (fCambioPass.invalid) {  
    return;
    }
    
    this.DatosPeticion = await this.serv.postData(this.formulario);
    console.log(this.DatosPeticion);
    if (this.DatosPeticion.result) {
      this.navCtrl.navigateRoot('login', { animated: true });
    } else {
      this.mensaje = this.DatosPeticion.msg;
      this.formCorrecto = false;
    }
    
  }


}
