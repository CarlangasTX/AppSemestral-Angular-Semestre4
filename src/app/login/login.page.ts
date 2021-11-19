import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public alertController: AlertController, public router: Router, private auth : AuthenticationService, private storage: Storage) {}

  formularioLogin = new FormGroup({
    'usuario': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required),
  })

  ngOnInit() {
    let u: Usuario;
    let lista: Usuario[] = [];
    u = {
      usuario: "admin",
      password: "admin",
      correo: "admin@admin.cl",
      tipousuario: "",
      nacimiento: "",
      telefono: 1
    };
    lista.push(u);
    this.storage.create();
    this.storage.get('lista_usuarios').then((usuarios: Usuario[])=>{
      if(usuarios==null){
        this.storage.set('lista_usuarios', lista);
      }
    }
    
    )
  }
  
    ingresar(){
    this.auth.login(this.formularioLogin.controls.usuario.value,this.formularioLogin.controls.password.value);
    this.formularioLogin.controls.password.setValue('');
    this.formularioLogin.controls.usuario.setValue('');
    
  }



}
