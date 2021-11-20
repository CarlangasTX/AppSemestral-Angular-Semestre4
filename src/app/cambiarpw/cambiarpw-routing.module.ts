import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarpwPage } from './cambiarpw.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarpwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarpwPageRoutingModule {}
