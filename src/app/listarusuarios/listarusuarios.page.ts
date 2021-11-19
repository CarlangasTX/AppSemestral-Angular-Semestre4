import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
export interface Usuario{
  usuario: string,
  password: string,
  correo: string,
  tipousuario: string,
  nacimiento: string,
  telefono: number,
};
@Component({
  selector: 'app-listarusuarios',
  templateUrl: './listarusuarios.page.html',
  styleUrls: ['./listarusuarios.page.scss'],
})
export class ListarusuariosPage implements OnInit {
  lista: Usuario[] = [];
  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('lista_usuarios').then((usuarios: Usuario[])=>{
      
      for(let usu of usuarios){
        this.lista.push(usu);
      }

    });
  }

}
