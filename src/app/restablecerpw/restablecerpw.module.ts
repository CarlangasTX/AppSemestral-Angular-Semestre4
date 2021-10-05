import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestablecerpwPageRoutingModule } from './restablecerpw-routing.module';

import { RestablecerpwPage } from './restablecerpw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerpwPageRoutingModule
  ],
  declarations: [RestablecerpwPage]
})
export class RestablecerpwPageModule {}
