import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommandPageRoutingModule } from './command-routing.module';

import { CommandPage } from './command.page';

import {IonicInputMaskModule} from '@thiagoprz/ionic-input-mask';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommandPageRoutingModule,
      IonicInputMaskModule
    ],
  declarations: [CommandPage]
})
export class CommandPageModule {}
