import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomehomePageRoutingModule } from './homehome-routing.module';

import { HomehomePage } from './homehome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomehomePageRoutingModule
  ],
  declarations: [HomehomePage]
})
export class HomehomePageModule {}
