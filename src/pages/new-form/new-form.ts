import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormFormPage } from '../new-form-form/new-form-form';
import { NewFormClientPage } from '../new-form-client/new-form-client';
import { NewFormSignaturePage } from '../new-form-signature/new-form-signature';
import { data } from "../../environment/environment";

/**
 * Generated class for the NewFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-form',
  templateUrl: 'new-form.html',
})
export class NewFormPage {

  tab1Root = NewFormFormPage;
  tab2Root = NewFormClientPage;
  tab3Root = NewFormSignaturePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    if (navParams.get('data') == false) {
      console.log('no data');

      data.key = '';
      data.employee = {
        title: '',
        company_name: '',
        pid: '',
        department: '',
        purpose: '',
        work_done: '',
        future_remarks: '',
        pending_work: '',
        client_remark: '',
        rating: '',
      };
      data.client = {
        client_name: '',
        designation: '',
        contact_no: '',
      };
      data.signature = {
        client_signature: '',
        emp_signature: '',
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFormPage');
  }

}
