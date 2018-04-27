import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFormClientPage } from './new-form-client';

@NgModule({
  declarations: [
    NewFormClientPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFormClientPage),
  ],
})
export class NewFormClientPageModule {}
