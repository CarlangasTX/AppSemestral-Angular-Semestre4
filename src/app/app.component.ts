import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
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
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private platform: Platform,
    private authService : AuthenticationService
  ) {

    authService.authState.subscribe(estado=>{
      if (estado) {
        router.navigate(['home']);
      }else{
        router.navigate(['login']);
      }
    }); 

  }
}
