import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams, Platform, Tabs, App, ToastController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { data } from "../../environment/environment";
import { NewFormFormPage } from '../new-form-form/new-form-form';
import { NewFormClientPage } from '../new-form-client/new-form-client';
import { Dialogs } from '@ionic-native/dialogs';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-new-form-signature',
  templateUrl: 'new-form-signature.html',
})
export class NewFormSignaturePage {

  drawn1 = false;
  drawn2 = false;

  @ViewChild('SignaturePad1') signaturePad1: SignaturePad;
  @ViewChild('SignaturePad2') signaturePad2: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': this.platform.width() - 42,
    'canvasHeight': (this.platform.height()) * 0.2,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public dialogs: Dialogs,
    public loadingCtrl: LoadingController,
    public app: App,
    public toastCtrl: ToastController
  ) {
    console.log(JSON.stringify(data.signature));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFormSignaturePage');

    if (data.signature.client_signature != '') {
      this.signaturePad1.fromDataURL(data.signature.client_signature);
      this.signaturePad2.fromDataURL(data.signature.emp_signature);

      this.drawn1 = true;
      this.drawn2 = true;
    }
  }

  drawStart1() {
    this.drawn1 = true;
  }

  drawStart2() {
    this.drawn2 = true;
  }

  savePad() {
    let signature1 = this.signaturePad1.toDataURL();
    data.signature.client_signature = signature1;

    let signature2 = this.signaturePad2.toDataURL()
    data.signature.emp_signature = signature2;
  }

  clearPad1() {
    this.signaturePad1.clear();
    this.drawn1 = false;
  }

  clearPad2() {
    this.signaturePad2.clear();
    this.drawn2 = false;
  }

  validate() {
    console.log("signature: validate");
    var err = false;
    var msg = '';

    if (!this.drawn1) {
      msg += '\n\t Customer Signature'
      err = true;
    }
    if (!this.drawn2) {
      msg += '\n\t Employee Signature'
      err = true;
    }

    if (!err) {
      return true;
    }

    return msg;
  }

  previous() {
    var t: Tabs = this.navCtrl.parent;
    t.select(1);
  }

  submit() {
    this.savePad();

    var detailsMsg = new NewFormFormPage(this.navCtrl, this.dialogs).validate();
    var clientMsg = new NewFormClientPage(this.navCtrl, this.dialogs).validate();
    var signMsg = this.validate();

    var err = false;
    var msg = '';
    if (detailsMsg != true) {
      err = true;
      msg += '\nDETAILS:' + detailsMsg;
    }
    if (clientMsg != true) {
      err = true;
      msg += '\nCLIENT:' + clientMsg;
    }
    if (signMsg != true) {
      err = true;
      msg += '\nSIGNATURE:' + signMsg;
    }

    if (err) {
      console.log(err);
      this.dialogs.alert(msg, "Following fields cannot be empty: ")
        .then(() => console.log("Dialog Dismissed"))
        .catch((err) => console.log(JSON.stringify(err)))
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();

    let reference = firebase.database().ref().child(firebase.auth().currentUser.uid).child('forms');
    let task = null;
    if (data.key == '') {
      task = reference.push({
        title: data.employee.title,
        company_name: data.employee.company_name,
        pid: data.employee.pid,
        department: data.employee.department,
        purpose: data.employee.purpose,
        work_done: data.employee.work_done,
        future_remarks: data.employee.future_remarks,
        pending_work: data.employee.pending_work,
        client_remark: data.employee.client_remark,
        rating: data.employee.rating,
        client_name: data.client.client_name,
        designation: data.client.designation,
        contact_no: data.client.contact_no,
        client_signature: data.signature.client_signature,
        emp_signature: data.signature.emp_signature,
        approved: 'pending',
        date: moment().format('Do MMM YYYY, h:mm a')
      })
    } else {
      task = reference.child(data.key).set({
        title: data.employee.title,
        company_name: data.employee.company_name,
        pid: data.employee.pid,
        department: data.employee.department,
        purpose: data.employee.purpose,
        work_done: data.employee.work_done,
        future_remarks: data.employee.future_remarks,
        pending_work: data.employee.pending_work,
        client_remark: data.employee.client_remark,
        rating: data.employee.rating,
        client_name: data.client.client_name,
        designation: data.client.designation,
        contact_no: data.client.contact_no,
        client_signature: data.signature.client_signature,
        emp_signature: data.signature.emp_signature,
        approved: 'pending',
        date: moment().format('Do MMM YYYY, h:mm a')
      })
    }
    task.then(_ => {
      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Data uploaded successfully',
        duration: 2000
      });
      toast.present();

      this.navCtrl.setRoot(HomePage);
      // this.app.getRootNavs()[0].push(HomePage);
    });
  }
}
