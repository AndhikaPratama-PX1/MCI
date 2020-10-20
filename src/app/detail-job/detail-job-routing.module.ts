import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailJobPage } from './detail-job.page';

const routes: Routes = [
  {
    path: '',
    component: DetailJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailJobPageRoutingModule {}
