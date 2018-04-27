import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayFormPage } from './display-form';

@NgModule({
  declarations: [
    DisplayFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayFormPage),
  ],
})
export class DisplayFormPageModule {}
