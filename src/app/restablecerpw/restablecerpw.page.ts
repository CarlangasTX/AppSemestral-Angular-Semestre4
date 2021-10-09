import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecerpw',
  templateUrl: './restablecerpw.page.html',
  styleUrls: ['./restablecerpw.page.scss'],
})
export class RestablecerpwPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router) { }
  formularioPw = new FormGroup({
    'usuario': new FormControl("", Validators.required),
    'correo': new FormControl("", [Validators.required, Validators.email])
  })

  nuevaPw = new FormGroup({
    'password': new FormControl("", Validators.required),
  })
  
  mostrar = true;
  lista_usuarios = [];
  auxiliar = false;
  ngOnInit() {
  }

  async verificar(){
    var verificar = this.formularioPw.value;
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
      if(verificar.usuario == user.usuario && verificar.correo == user.correo){
        numerito += 1; 
        const alert = await this.alertController.create({
          header: 'Datos verificados',
          message: 'Por favor, escriba una nueva contraseña',
          buttons: ['Aceptar']
        });
    
        await alert.present();
        this.mostrar = !this.mostrar;
        this.auxiliar = true;
      }
      
      lista_temporal.push(user);
    }

    if(numerito == 0){
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Usuario y/o correo no existen.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }

    this.lista_usuarios = lista_temporal; 
  }
  async cambiar(){
    var verificar = this.formularioPw.value;
    var nuevapw = this.nuevaPw.value;
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
      if(verificar.usuario == user.usuario && verificar.correo == user.correo && nuevapw.password.length !== 0){
        numerito += 1; 
        user.password= nuevapw.password;
        const alert = await this.alertController.create({
          message: 'La contraseña ha sido cambiada correctamente',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/login']);
              }}
            ]    
        });
    
        await alert.present();
      }
      
      lista_temporal.push(user);
    }

    if(numerito == 0){
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Por favor, escriba una nueva contraseña',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }

    this.lista_usuarios = lista_temporal; 
    localStorage.setItem('usuario',JSON.stringify(this.lista_usuarios));
  }
}
