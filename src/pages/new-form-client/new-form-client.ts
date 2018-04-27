import { Component } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { data } from "../../environment/environment";
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
  selector: 'page-new-form-client',
  templateUrl: 'new-form-client.html',
})
export class NewFormClientPage {

  data = data.client;

  constructor(public navCtrl: NavController, public dialogs: Dialogs) {
    console.log(JSON.stringify(data.client));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFormClientPage');
  }

  change() {
    data.client = this.data;
  }

  next() {
    var res = this.validate();
    if (res != true) {
      this.dialogs.alert(res, "Following fields cannot be empty: ");
      return;
    }

    var t: Tabs = this.navCtrl.parent;
    t.select(2);
  }
  
  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(0);
  }

  validate() {
    console.log("client: validate");
    var err = false;
    var msg = '';

    if(data.client.client_name == '') {
      msg += '\n\t Client Name'
      err = true;
    }
    if(data.client.designation == '') {
      msg += '\n\t Designation'
      err = true;
    }
    if(data.client.contact_no == '') {
      msg += '\n\t Contact Number'
      err = true;
    }
    
    if (!err) {
      return true;
    }

    return msg;
  }

}
