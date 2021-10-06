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

  lista_usuarios = new Array();
  usuario:any;
  constructor(public alertController: AlertController, private router:Router) {}
   formularioRegistrar = new FormGroup({
    'nombre': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'apellido': new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    'correo' : new FormControl("",[Validators.required, Validators.email]),
    'usuario': new FormControl("", Validators.required),
    'contraseña': new FormControl("", Validators.required),
  })
  
    ngOnInit() {
   }

  async registrar(){
    var registro = this.formularioRegistrar.value;
  
    if(this.formularioRegistrar.invalid){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene los datos correctamente.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    this.usuario = {
      nombre: registro.nombre,
      apellido: registro.apellido,
      correo: registro.correo,
      usuario: registro.usuario,
      contraseña: registro.contraseña,
    }

    this.lista_usuarios.push(this.usuario);
    localStorage.setItem('usuario',JSON.stringify(this.lista_usuarios));
     
    if(this.formularioRegistrar.valid){
      const alert = await this.alertController.create({
        header: 'Registrado',
        message: 'Registrado correctamente.',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.formularioRegistrar.controls.nombre.setValue('');
              this.formularioRegistrar.controls.apellido.setValue('');
              this.formularioRegistrar.controls.correo.setValue('');
              this.formularioRegistrar.controls.usuario.setValue('');
              this.formularioRegistrar.controls.contraseña.setValue('');
            }}
          ]
      });
      await alert.present();
      return;
    }
  }
}
