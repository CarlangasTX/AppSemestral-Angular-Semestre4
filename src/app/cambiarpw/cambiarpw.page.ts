import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  selector: 'app-cambiarpw',
  templateUrl: './cambiarpw.page.html',
  styleUrls: ['./cambiarpw.page.scss'],
})
export class CambiarpwPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router, private storage: Storage) { }
  formularioPw = new FormGroup({
    'usuario': new FormControl("", Validators.required),
    'correo': new FormControl("", [Validators.required, Validators.email]),
    'password': new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  nuevaPw = new FormGroup({
    'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
    'password2': new FormControl("", [Validators.required, Validators.minLength(8)])
  })
  
  mostrar = true;
  lista: Usuario[] = [];
  lista_usuarios = [];
  auxiliar = false;
  ngOnInit() {
  }

  async verificar(){
    var verificar = this.formularioPw.value;

    var alertita = false;

    this.storage.create();
    this.storage.get('lista_usuarios').then(async (usuarios: Usuario[])=>{

      this.lista = [];
      for(let usu of usuarios){
        if(verificar.usuario == usu.usuario && verificar.correo == usu.correo && verificar.password == usu.password){
          alertita = true; 
          const alert = await this.alertController.create({
            header: 'Datos verificados',
            message: 'Por favor, escriba una nueva contraseña',
            buttons: ['Aceptar']
          });
      
          await alert.present();
          this.mostrar = !this.mostrar;
          this.auxiliar = true;
        }
      }
      if(alertita == false){
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos introducidos no son correctos.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      } 
    });
    
  }


  async cambiar(){
    var verificar = this.formularioPw.value;
    var nuevapw = this.nuevaPw.value;
    var alertita = false;
    var validacionpw = {
      password: this.nuevaPw.controls.password.value,
      password2: this.nuevaPw.controls.password2.value,
    }

    if (validacionpw.password != validacionpw.password2) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: [ {
          text: 'Aceptar',
          handler: () => {
            this.nuevaPw.controls.password.setValue('');
            this.nuevaPw.controls.password2.setValue('');
          }}]
      });
      await alert.present();
      this.nuevaPw.invalid;
      return;
    }
    this.storage.create();
    this.storage.get('lista_usuarios').then(async (usuarios: Usuario[])=>{

      this.lista = [];
      for(let usu of usuarios){
        if(verificar.usuario == usu.usuario && verificar.correo == usu.correo && nuevapw.password.length !== 0){
          alertita = true; 
          usu.password = nuevapw.password;
          const alert = await this.alertController.create({
            message: 'La contraseña ha sido cambiada correctamente',
            backdropDismiss: false,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.router.navigate(['/home']);
                }}
              ]    
          });
      
          await alert.present();
        }
        
        this.lista.push(usu);
      }
      if(alertita == false){
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Por favor, escriba una nueva contraseña',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      } 
      this.storage.set('lista_usuarios', this.lista);
    });
    
  }
}
