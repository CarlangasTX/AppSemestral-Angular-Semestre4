import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  
  constructor(public router: Router, private barCodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery, private datePipe: DatePipe) { }
  

    mostrar = true;

    qrData: any;
    myDate: any;
    fecha: any;
    hora: any;
    datoqr: any; 

  mostrarQr(){
      this.mostrar = !this.mostrar;
      
      this.myDate = new Date();

      this.fecha = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');

      this.hora = this.datePipe.transform(this.myDate, 'HH:mm:ss');

      this.datoqr = "Asistencia registrada\n" + "\nFecha: " + this.fecha + "\n" + "\nHora: " + this.hora;
      
      this.qrData = this.datoqr;
  }
 
  elementType : 'url' | 'img' | 'canvas' = 'canvas';
  ngOnInit() {
  }


  salir(){
    localStorage.removeItem('ingresado');
    window.location.reload();
  }
  esDocente(){
    if(this.usuariologeado == 'docente' || this.usuariologeado == 'Docente'){
      return true;
    }else{
    return false;
    }
  }
  usuariologeado = localStorage.getItem('logeado');
}
