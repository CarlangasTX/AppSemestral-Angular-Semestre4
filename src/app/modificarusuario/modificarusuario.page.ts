import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
export interface Usuario{
  id: string,
  usuario: string,
  password: string,
  correo: string,
  tipousuario: string,
  nacimiento: string,
  telefono: number,
};
@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.page.html',
  styleUrls: ['./modificarusuario.page.scss'],
})
export class ModificarusuarioPage implements OnInit {

  lista: Usuario[] = [];
  cusuario: any;
  constructor(private storage: Storage, public alertController: AlertController, private database: DatabaseService) { }
  formularioModificar = new FormGroup({
    'password2': new FormControl("", [Validators.required, Validators.minLength(8)]),
    'correo2' : new FormControl("",[Validators.required, Validators.email]),
    'tipousuario2': new FormControl("", Validators.required),
    'nacimiento2': new FormControl("", Validators.required),
    'telefono2': new FormControl("", [Validators.required, Validators.min(10000000), Validators.max(100000000)]),
  })

  ngOnInit() {
    this.storage.create();
    this.storage.get('lista_usuarios').then((usuarios: Usuario[])=>{
      
      for(let usu of usuarios){
        if(usu.usuario != "admin"){
          this.lista.push(usu);
        }
        
      }

    });
  }

 async modificar(id){
    
    var usuarioc: any;
    usuarioc = {
      correo: this.formularioModificar.controls.correo2.value,
      usuario: this.cusuario,
      password: this.formularioModificar.controls.password2.value,
      tipousuario: this.formularioModificar.controls.tipousuario2.value,
      nacimiento: this.formularioModificar.controls.nacimiento2.value,
      telefono: this.formularioModificar.controls.telefono2.value
    };
    if(this.formularioModificar.invalid){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene los datos correctamente',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }
    this.storage.create();
    this.storage.get('lista_usuarios').then(async (usuarios: Usuario[])=>{

      this.lista = [];
      for(let usu of usuarios){
        if(id == usu.usuario){
          usuarioc.usuario = id;
          this.lista.push(usuarioc); 
          this.database.actualizar('usuarios',usu.id,usuarioc);
        }else{
          this.lista.push(usu);
        }
      }
      this.storage.set('lista_usuarios', this.lista);
      const alert = await this.alertController.create({
        header: 'Usuario modificado',
        message: 'Usuario modificado correctamente',
        backdropDismiss: false,
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
      
    });
    
  }
    
  }
  

