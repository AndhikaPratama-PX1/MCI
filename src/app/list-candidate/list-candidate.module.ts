import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCandidatePageRoutingModule } from './list-candidate-routing.module';

import { ListCandidatePage } from './list-candidate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCandidatePageRoutingModule
  ],
  declarations: [ListCandidatePage]
})
export class ListCandidatePageModule {}
