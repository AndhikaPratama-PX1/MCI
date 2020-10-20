import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailJobPageRoutingModule } from './detail-job-routing.module';

import { DetailJobPage } from './detail-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailJobPageRoutingModule
  ],
  declarations: [DetailJobPage]
})
export class DetailJobPageModule {}
