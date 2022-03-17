import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) { }

  //crear usuario
  async crear(coleccion, dato){
    try {
      return await this.firestore.collection(coleccion).add(dato);
    } catch (error) {
      console.log("error: ",error);
    }
  }

  //obtener todos
  async obtenerTodos(coleccion){
    try {
      return await this.firestore.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log("error: ",error);
    }
  }

  //eliminar
  async eliminar(coleccion, id){
    try {
      return await this.firestore.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log("error: ",error);
    }
  }

  //actualizar:
  async actualizar(coleccion, id, dato){
    try {
      return await this.firestore.collection(coleccion).doc(id).set(dato);
    } catch (error) {
      console.log("error: ",error);
    }
  }
}
