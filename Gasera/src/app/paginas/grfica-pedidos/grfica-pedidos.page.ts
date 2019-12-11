import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BuscarService } from '../services/buscar.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-grfica-pedidos',
  templateUrl: './grfica-pedidos.page.html',
  styleUrls: ['./grfica-pedidos.page.scss'],
})

export class GrficaPedidosPage implements OnInit {
  @ViewChild('barChart', null) barChart;
  constructor(
    private serv:BuscarService,
    private navCtrl: NavController,
    private storage:Storage
  ) { }

  ngOnInit() {
  }
  
  bars: any;
  colorArray: any;
  usuario: any;
  datosRespuesta: any;
  cantidades: any;
  cargado: true;

  ionViewDidEnter() {
    
    this.storage.get('usuario').then((data)=>{
      this.usuario=data;
      this.usuario.tipoMov = 'graficaCantidadDia';
      console.log(this.usuario);
      this.serv.postData(this.usuario).then((data2)=>{
        this.datosRespuesta = data2;
        this.cantidades = this.datosRespuesta.result;
        console.log(this.cantidades);
        this.cargado = true;
        this.createBarChart();
      });
    });

  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        datasets: [{
          label: 'Cantidad de Pedidos',
          data: this.cantidades,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
