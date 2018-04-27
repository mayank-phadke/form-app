import { Component, ViewChild } from '@angular/core';
import { Nav } from "ionic-angular";

import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { UpdateFormPage } from '../update-form/update-form';
import { NewFormPage } from '../new-form/new-form';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  showRegister = false;
  name = "User";

  pages: Array<{ title: string, component: any, data: any }>;

  constructor() {
    this.pages = [
      { title: 'Home', component: HomePage, data: null },
      { title: 'New Form', component: NewFormPage, data: null },
      { title: 'Update Form', component: UpdateFormPage, data: { approved: 'pending' } },
      { title: 'Accepted Forms', component: UpdateFormPage, data: { approved: true } },
      { title: 'Rejected Forms', component: UpdateFormPage, data: { approved: false } },
    ];

    firebase.database().ref().child(firebase.auth().currentUser.uid).on('value', snapshot => {
      this.name = snapshot.child("name").val();
      console.log(this.name);
      if (snapshot.child('role').val() != 'Employee')
        this.showRegister = true;
      else
        this.showRegister = false;
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.data);
  }

  addUsers() {
    this.nav.setRoot(RegisterPage);
  }

  logout() {
    firebase.auth().signOut();
  }
}
