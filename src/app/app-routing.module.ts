import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenGuardService } from './services/authen-guard.service';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
   
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule),

  },
  {
    path: 'restablecerpw',
    loadChildren: () => import('./restablecerpw/restablecerpw.module').then( m => m.RestablecerpwPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenGuardService]
  },
  {
    path: 'crud',
    loadChildren: () => import('./crud/crud.module').then( m => m.CrudPageModule),
    canActivate: [AuthenGuardService]
  }, 
  {
    path: 'listarusuarios',
    loadChildren: () => import('./listarusuarios/listarusuarios.module').then( m => m.ListarusuariosPageModule)
  },
  
  {
    path: 'modificarusuario',
    loadChildren: () => import('./modificarusuario/modificarusuario.module').then( m => m.ModificarusuarioPageModule)
  },
  {
    path: 'eliminarusuario',
    loadChildren: () => import('./eliminarusuario/eliminarusuario.module').then( m => m.EliminarusuarioPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./p404/p404.module').then( m => m.P404PageModule), 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
