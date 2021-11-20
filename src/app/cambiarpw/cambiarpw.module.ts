import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarpwPageRoutingModule } from './cambiarpw-routing.module';

import { CambiarpwPage } from './cambiarpw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarpwPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CambiarpwPage]
})
export class CambiarpwPageModule {}
