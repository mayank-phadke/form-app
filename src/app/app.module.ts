import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonRating } from '../components/ion-rating/ion-rating';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NewFormPage } from '../pages/new-form/new-form';
import { UpdateFormPage } from '../pages/update-form/update-form';
import { NewFormClientPage } from '../pages/new-form-client/new-form-client';
import { NewFormSignaturePage } from '../pages/new-form-signature/new-form-signature';
import { NewFormFormPage } from '../pages/new-form-form/new-form-form';

import { SignaturePadModule } from "angular2-signaturepad";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dialogs } from '@ionic-native/dialogs';
import { DisplayFormPage } from '../pages/display-form/display-form';
import { DisplayFormClientPage } from '../pages/display-form-client/display-form-client';
import { DisplayFormFormPage } from '../pages/display-form-form/display-form-form';
import { DisplayFormSignaturePage } from '../pages/display-form-signature/display-form-signature';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    NewFormPage,
    NewFormFormPage,
    NewFormClientPage,
    NewFormSignaturePage,
    UpdateFormPage,
    DisplayFormPage,
    DisplayFormClientPage,
    DisplayFormFormPage,
    DisplayFormSignaturePage,
    RegisterPage,
    IonRating
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    NewFormPage,
    NewFormFormPage,
    NewFormClientPage,
    NewFormSignaturePage,
    UpdateFormPage,
    DisplayFormPage,
    DisplayFormClientPage,
    DisplayFormFormPage,
    DisplayFormSignaturePage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
