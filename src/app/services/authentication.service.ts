import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
export interface Usuario{
  usuario: string,
  password: string,
  correo: string,
  tipousuario: string,
  nacimiento: string,
  telefono: number,
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  lista: Usuario[] = [];
  constructor( private router: Router, 
    private platform: Platform, private storage: Storage, 
    private alertController: AlertController)
   { }
   
   async presentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Usuario y/o contraseña incorrectos',
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    }
   
   login(nombre_usuario, password){
    this.storage.create();
    this.storage.get('lista_usuarios').then((usuarios: Usuario[])=>{

      this.lista = [];
      var alertita = false;
      for(let usu of usuarios){
        if(nombre_usuario=="admin" && password=="admin"){ 
          this.authState.next(true);
          this.router.navigate(['crud']);
          alertita = true;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Autenticado',
            showConfirmButton: false,
            timer: 2000
          })
        }
        else if(nombre_usuario==usu.usuario && password==usu.password) {
          this.authState.next(true);
          this.router.navigate(['home']);
          console.log(this.authState);
          alertita = true;
          localStorage.setItem('bienvenido', usu.usuario);
          localStorage.setItem('tipo', usu.tipousuario);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Autenticado',
            showConfirmButton: false,
            timer: 2000
          })
          
        }
       
      }
      if(alertita == false){
        this.presentarAlerta();
      }
    });
  }

  logout(){
    this.router.navigate(['login']);
    this.authState.next(false);
    localStorage.removeItem('bienvenido');
    localStorage.removeItem('tipo');
  }

  isAuthenticated():boolean{
    return this.authState.value;
  }

}
