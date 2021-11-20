import { invalid } from '@angular/compiler/src/render3/view/util';
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
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  LLAVE_USUARIOS = "lista_usuarios";

  constructor(public alertController: AlertController, private router:Router, private storage: Storage) {}
   formularioRegistrar = new FormGroup({
    'usuario': new FormControl("", [Validators.required, Validators.minLength(5)]),
    'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
    'correo' : new FormControl("",[Validators.required, Validators.email]),
    'password2': new FormControl("", [Validators.required, Validators.minLength(8)]),
    'tipousuario': new FormControl("", Validators.required),
    'nacimiento': new FormControl("", Validators.required),
    'telefono': new FormControl("", [Validators.required, Validators.min(10000000), Validators.max(100000000)]),
  })
  
    ngOnInit() {
   }


  async registrar(){

    var validacionpw = {
      password: this.formularioRegistrar.controls.password.value,
      password2: this.formularioRegistrar.controls.password2.value,
    }

    if (validacionpw.password != validacionpw.password2) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: [ {
          text: 'Aceptar',
          handler: () => {
            this.formularioRegistrar.controls.password.setValue('');
            this.formularioRegistrar.controls.password2.setValue('');
          }}]
      });
      await alert.present();
      this.formularioRegistrar.invalid;
      return;
    }

    if(this.formularioRegistrar.invalid){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene los datos correctamente',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

      let u: Usuario; 
      u = {
        correo: this.formularioRegistrar.controls.correo.value,
        usuario: this.formularioRegistrar.controls.usuario.value,
        password: this.formularioRegistrar.controls.password.value,
        tipousuario: this.formularioRegistrar.controls.tipousuario.value,
        nacimiento: this.formularioRegistrar.controls.nacimiento.value,
        telefono: this.formularioRegistrar.controls.telefono.value
      };
    
      this.agregarUsuario(u);
    }

    agregarUsuario(usuario: Usuario){
      this.storage.create();
      this.storage.get(this.LLAVE_USUARIOS).then(async (usuarios: Usuario[])=>{

        if(!usuarios){
          this.storage.set(this.LLAVE_USUARIOS,[usuario]);
          const alert = await this.alertController.create({
            header: 'Usuario creado',
            message: 'Usuario creado correctamente',
            backdropDismiss: false,
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.formularioRegistrar.controls.correo.setValue('');
                  this.formularioRegistrar.controls.usuario.setValue('');
                  this.formularioRegistrar.controls.password.setValue('');
                  this.formularioRegistrar.controls.password2.setValue('');
                  this.formularioRegistrar.controls.tipousuario.setValue('');
                  this.formularioRegistrar.controls.nacimiento.setValue('');
                  this.formularioRegistrar.controls.telefono.setValue('');
                }}
              ]
          });
          await alert.present();
          return;
        }else{
          
          let existe: boolean = false;
            for(let u of usuarios){
              if (usuario.usuario == u.usuario) {
                existe = true;
                break;
              }
            }
    
            if(existe){
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'El usuario ya existe',
                buttons: ['Aceptar']
              });
          
              await alert.present();
              return;
            }else{
              usuarios.push(usuario);
              this.storage.set(this.LLAVE_USUARIOS, usuarios);
              const alert = await this.alertController.create({
                header: 'Usuario creado',
                message: 'Usuario creado correctamente',
                backdropDismiss: false,
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.formularioRegistrar.controls.correo.setValue('');
                      this.formularioRegistrar.controls.usuario.setValue('');
                      this.formularioRegistrar.controls.password.setValue('');
                      this.formularioRegistrar.controls.tipousuario.setValue('');
                      this.formularioRegistrar.controls.nacimiento.setValue('');
                      this.formularioRegistrar.controls.telefono.setValue('');
                    }}
                  ]
              });
              await alert.present();
              return;
            }
        }
      });
    }

  }

