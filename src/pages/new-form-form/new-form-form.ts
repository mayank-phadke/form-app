import { Component } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { data } from "../../environment/environment";
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
  selector: 'page-new-form-form',
  templateUrl: 'new-form-form.html',
})
export class NewFormFormPage {

  data = data.employee;

  constructor(public navCtrl: NavController, public dialogs: Dialogs) {
    console.log(JSON.stringify(data.employee));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFormFormPage');
  }

  starClicked(value) {
    console.log("Rated :", value);
    this.data.rating = value;
  }

  change() {
    data.employee = this.data;
  }

  next() {
    var res = this.validate();
    if (res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(1);
  }

  validate() {
    console.log("details: validate");
    var err = false;
    var msg = '';

    if (data.employee.title == '') {
      msg += '\n\t Project Title'
      err = true;
    }
    if (data.employee.company_name == '') {
      msg += '\n\t Company Name'
      err = true;
    }
    if (data.employee.pid == '') {
      msg += '\n\t PID'
      err = true;
    }
    if (data.employee.department == '') {
      msg += '\n\t Department'
      err = true;
    }
    if (data.employee.purpose == '') {
      msg += '\n\t Purpose of Visit'
      err = true;
    }
    if (data.employee.work_done == '') {
      msg += '\n\t Details of Work'
      err = true;
    }
    if (data.employee.client_remark == '') {
      msg += '\n\t Client Remark'
      err = true;
    }
    if (data.employee.rating == '') {
      msg += '\n\t Rating'
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }
}
