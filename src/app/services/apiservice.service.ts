import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs'; //elemento que permite ver el resultado entregado por la API
import { retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private http: HttpClient) { }

    //vamos a crear una variable para guardar la ruta de la API
    ruta:string = 'https://pokeapi.co/api/v2/pokemon/';
    //debemos generar la cabecera con los permisos para consumir la API
    httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '**'
      })
    }
  
  
    //recuperar el dolar
    getDolar(): Observable<any>{
      return this.http.get('https://mindicador.cl/api/dolar').pipe( retry(3) );
    }
    getPokemon(id: string): Observable<any>{
      return this.http.get(this.ruta + id).pipe( retry(3) );
    }
}
