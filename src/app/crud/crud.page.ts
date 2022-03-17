import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { APIServiceService } from '../services/apiservice.service';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private auth: AuthenticationService, private apiServ: APIServiceService) { }

  ngOnInit() {
  }
  salir(){
    this.auth.logout();
  }
  dolar: string;
  recuperarDolar(){
    this.apiServ.getDolar().subscribe(
      (data)=>{
        this.dolar = (data.serie[0].valor);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  id: string;
  orden: string;
  nombre: string;
  imagen: string;
  
  recuperarPokemon(){
    this.apiServ.getPokemon(this.id.toLocaleLowerCase()).subscribe(
      (data:any)=>{
        this.imagen = (data.sprites.front_default);
        this.orden = (data.id);
        this.nombre = (data.name);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
