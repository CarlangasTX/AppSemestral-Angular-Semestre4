import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router) {}

  formularioLogin = new FormGroup({
    'usuario': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
  })

  ngOnInit() {
  }
  
   lista_usuarios = [];

  async ingresar(){
    
    var ingreso = this.formularioLogin.value;

    var datos = localStorage.getItem('usuario');

    datos = datos.replace('[','');
    datos = datos.replace(']','');
    datos = datos.split('},{').join('};{');
    
    var arreglo_temp = datos.split(';');
    var user;
    var lista_temporal = new Array();

    var numerito = 0;

    for (let index = 0; index < arreglo_temp.length; index++) {
      var registro = arreglo_temp[index];
      var users = JSON.parse(registro);
      
      user={
        correo: users.correo,
        usuario: users.usuario,
        password: users.password
      };
      if(ingreso.usuario == user.usuario && ingreso.password == user.password){
        numerito += 1; 
        localStorage.setItem('ingresado', 'true');
        this.router.navigate(['/home']);
        localStorage.setItem('logeado', user.usuario);
      }
      
      lista_temporal.push(user);
    }

    if(numerito == 0){
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Usuario y/o contraseña incorrectos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }

    this.lista_usuarios = lista_temporal; 
  }



}
