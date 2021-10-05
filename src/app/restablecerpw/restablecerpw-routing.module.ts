import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestablecerpwPage } from './restablecerpw.page';

const routes: Routes = [
  {
    path: '',
    component: RestablecerpwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestablecerpwPageRoutingModule {}
