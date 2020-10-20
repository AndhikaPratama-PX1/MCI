import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomehomePage } from './homehome.page';

const routes: Routes = [
  {
    path: '',
    component: HomehomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomehomePageRoutingModule {}
