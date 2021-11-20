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
  selector: 'app-restablecerpw',
  templateUrl: './restablecerpw.page.html',
  styleUrls: ['./restablecerpw.page.scss'],
})
export class RestablecerpwPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router, private storage: Storage) { }
  formularioPw = new FormGroup({
    'correo': new FormControl("", [Validators.required, Validators.email])
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
        if(verificar.correo == usu.correo){
          alertita = true; 
          const alert = await this.alertController.create({
            header: 'Datos verificados',
            message: 'Las instrucciones para restablecer su contraseña han sido enviadas a su correo',
            backdropDismiss: false,
            buttons:[
              {
                text: 'Aceptar',
                handler: () => {
                  this.router.navigate(['/login']);
                }}
              ]
          });
      
          await alert.present();
        }
      }
      if(alertita == false){
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Correo incorrecto.',
          buttons: ['Aceptar']
        });
    
        await alert.present();
      } 
    });
    
  }

}
