import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdonnancePageRoutingModule } from './ordonnance-routing.module';

import { OrdonnancePage } from './ordonnance.page';
//import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //IonicStorageModule,
    ReactiveFormsModule,
    IonicModule,
    OrdonnancePageRoutingModule
  ],
  declarations: [OrdonnancePage]
})
export class OrdonnancePageModule {}
