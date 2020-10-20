import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoneJobPageRoutingModule } from './done-job-routing.module';

import { DoneJobPage } from './done-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoneJobPageRoutingModule
  ],
  declarations: [DoneJobPage]
})
export class DoneJobPageModule {}
