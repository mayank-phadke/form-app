import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewFormFormPage } from './new-form-form';

@NgModule({
  declarations: [
    NewFormFormPage,
  ],
  imports: [
    IonicPageModule.forChild(NewFormFormPage),
  ],
})
export class NewFormFormPageModule {}
