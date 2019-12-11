import { Component } from '@angular/core';
import { BuscarService } from '../paginas/services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(
    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage
  ) {}

}
