import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  selector: 'app-eliminarusuario',
  templateUrl: './eliminarusuario.page.html',
  styleUrls: ['./eliminarusuario.page.scss'],
})
export class EliminarusuarioPage implements OnInit {

  lista: Usuario[] = [];
  constructor(private storage: Storage, public alertController: AlertController, private database: DatabaseService) { }

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
  eliminar(id){
    var idf: any;
    this.storage.create();
    this.storage.get('lista_usuarios').then(async (usuarios: Usuario[])=>{
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¿Seguro que quieres eliminar el usuario "' + id + '"?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.lista = [];
              for(let usu of usuarios){
                if(id!=usu.usuario){
                  this.lista.push(usu);
                }
                else if(id == usu.usuario){
                  idf = usu.id;
                }
              }
              this.database.eliminar('usuarios',idf).then(res=>{
              }).catch(error=>{
                console.log("error: ",error);
              });
              this.storage.set('lista_usuarios',this.lista);
            }},
          {
            text: 'Cancelar'
          }
          ]
      });
      await alert.present();
      return;
      
    });
  }

}
