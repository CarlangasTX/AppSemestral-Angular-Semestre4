import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {


  constructor(public alertController: AlertController, private router:Router) {}
   formularioRegistrar = new FormGroup({
    'usuario': new FormControl("", [Validators.required, Validators.minLength(5)]),
    'password': new FormControl("", Validators.required),
    'correo' : new FormControl("",[Validators.required, Validators.email]),
  })
  
    ngOnInit() {
   }
  lista_usuarios = new Array();

  async registrar(){
    var registro = this.formularioRegistrar.value;
  
    if(this.formularioRegistrar.invalid){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene los datos correctamente',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      correo: registro.correo,
      usuario: registro.usuario,
      password: registro.password,
    }

    this.lista_usuarios.push(usuario);

    localStorage.setItem('usuario',JSON.stringify(this.lista_usuarios));
     
    if(this.formularioRegistrar.valid){
      const alert = await this.alertController.create({
        header: 'Registrado',
        message: 'Registrado correctamente',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.formularioRegistrar.controls.correo.setValue('');
              this.formularioRegistrar.controls.usuario.setValue('');
              this.formularioRegistrar.controls.password.setValue('');
            }}
          ]
      });
      await alert.present();
      return;
    }
  }
}
