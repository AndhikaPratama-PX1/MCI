import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoneJobPage } from './done-job.page';

const routes: Routes = [
  {
    path: '',
    component: DoneJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoneJobPageRoutingModule {}
