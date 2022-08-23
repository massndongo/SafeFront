import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PonctuelPage } from './ponctuel.page';

const routes: Routes = [
  {
    path: '',
    component: PonctuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PonctuelPageRoutingModule {}
