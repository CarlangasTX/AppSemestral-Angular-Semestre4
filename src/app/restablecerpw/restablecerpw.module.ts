import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecerpwPageRoutingModule } from './restablecerpw-routing.module';

import { RestablecerpwPage } from './restablecerpw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerpwPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestablecerpwPage]
})
export class RestablecerpwPageModule {}
