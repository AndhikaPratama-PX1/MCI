import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListJobPage } from './list-job.page';

const routes: Routes = [
  {
    path: '',
    component: ListJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListJobPageRoutingModule {}
