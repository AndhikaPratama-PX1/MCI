import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindJobPage } from './find-job.page';

const routes: Routes = [
  {
    path: '',
    component: FindJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindJobPageRoutingModule {}
