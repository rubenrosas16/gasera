import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginUsuario = {
      usuario:'',
      password:'',
      tipoMov: 'login'
    };
    DatosUsuarios: any;
  constructor(
    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage
  ) { }
    passwordCorrecto = true;
    mensajePassword = "";

  ngOnInit() {
    this.storage.clear();

  }

  async login(fLogin: NgForm) {
    
    if (fLogin.invalid) {   
      this.mensajePassword = "Ingrese los datos para entrar.";
      this.passwordCorrecto = false;
      return;
    }
    this.DatosUsuarios = await this.serv.postData(this.loginUsuario);
    console.log(this.DatosUsuarios);
    if (this.DatosUsuarios.success) {
      this.storage.set('usuario', this.DatosUsuarios.result).then(x => {
        this.navCtrl.navigateRoot('menu', { animated: true });
      });
    } else {
      this.mensajePassword = this.DatosUsuarios.msg;
      this.passwordCorrecto = false;
    }

  }

  registrarse(){
    console.log("Registrarse");
    this.navCtrl.navigateRoot('registrarse', { animated: true });
  }

  cambiarPassword(){
    console.log("Cambiar Password");
    this.navCtrl.navigateRoot('cambio-password', { animated: true });
  }

}
