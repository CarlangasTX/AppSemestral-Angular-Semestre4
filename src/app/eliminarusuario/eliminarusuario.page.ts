import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
export interface Usuario{
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
  constructor(private storage: Storage, public alertController: AlertController) { }

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
              }

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
