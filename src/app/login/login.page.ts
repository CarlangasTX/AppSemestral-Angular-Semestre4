import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController) {}

  formularioLogin = new FormGroup({
    'usuario': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
  })

  ngOnInit() {
  }
  
  async ingresar(){
    
    var ingreso = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));
    
      if(ingreso.usuario == usuario.usuario){
        console.log('ok');
      }
      else{
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Usuario y/o contraseña incorrectos.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      }
  }



}
