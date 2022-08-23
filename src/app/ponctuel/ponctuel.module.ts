import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PonctuelPageRoutingModule } from './ponctuel-routing.module';

import { PonctuelPage } from './ponctuel.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PonctuelPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [PonctuelPage]
})
export class PonctuelPageModule {}
