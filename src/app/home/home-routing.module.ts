import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxQRCodeModule], 
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
