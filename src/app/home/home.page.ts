import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
export interface Usuario{
  usuario: string,
  password: string,
  correo: string,
  tipousuario: string,
  nacimiento: string,
  telefono: number,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  
  constructor(public router: Router, private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery, private datePipe: DatePipe, private auth: AuthenticationService, private storage: Storage) { }
  

    mostrar = true;

    qrData: any;
    myDate: any;
    fecha: any;
    hora: any;
    datoqr: any; 
    code: any;
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
  scan(){
  this.barcodeScanner.scan().then(barcodeData => {
    this.code = barcodeData.text;
    console.log('Barcode data', barcodeData);
   }).catch(err => {
       console.log('Error', err);
   });
  }
  salir(){
    this.auth.logout();
  }
  esDocente(){
    
    if(this.tipousuariologeado == 'Docente'){
      return true;
    }else{
    return false;
    }
  }
  tipousuariologeado = localStorage.getItem('tipo');
  usuariologeado = localStorage.getItem('bienvenido');
}
