import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCandidatePage } from './list-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: ListCandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCandidatePageRoutingModule {}
