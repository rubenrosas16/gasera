import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  formulario = {
    usuario:'',
    password:'',
    gasera: false,
    tipoMov: 'registrarse'
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

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {  
    return;
    }
    
    this.DatosPeticion = await this.serv.postData(this.formulario);
    console.log(this.DatosPeticion);
    if (this.DatosPeticion.result) {
      this.storage.set('usuario', this.DatosPeticion.result).then(x => {
        this.navCtrl.navigateRoot('menu', { animated: true });
      });
    } else {
      this.mensaje = this.DatosPeticion.msg;
      this.formCorrecto = false;
    }
    
  }


}
