import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFormPage } from './new-form';

@NgModule({
  declarations: [
    NewFormPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFormPage),
  ],
})
export class NewFormPageModule {}
