import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeedloginaccountPageRoutingModule } from './needloginaccount-routing.module';

import { NeedloginaccountPage } from './needloginaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeedloginaccountPageRoutingModule
  ],
  declarations: [NeedloginaccountPage]
})
export class NeedloginaccountPageModule {}
