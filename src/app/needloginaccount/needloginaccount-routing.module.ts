import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeedloginaccountPage } from './needloginaccount.page';

const routes: Routes = [
  {
    path: '',
    component: NeedloginaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeedloginaccountPageRoutingModule {}
