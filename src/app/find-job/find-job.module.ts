import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindJobPageRoutingModule } from './find-job-routing.module';

import { FindJobPage } from './find-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindJobPageRoutingModule
  ],
  declarations: [FindJobPage]
})
export class FindJobPageModule {}
