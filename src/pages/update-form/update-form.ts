import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { data } from "../../environment/environment";
import { NewFormPage } from '../new-form/new-form';
import { DisplayFormPage } from '../display-form/display-form';

@IonicPage()
@Component({
  selector: 'page-update-form',
  templateUrl: 'update-form.html',
})
export class UpdateFormPage {

  items = [];
  role = "Employee";
  title = "Pending Form";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

    switch (navParams.get('approved')) {
      case true:
        this.title = "Accepted Forms"
        break;
      case false:
        this.title = "Rejected Forms"
        break;
      case 'pending':
        this.title = "Pending Forms"
        break;
    }

    let loading = loadingCtrl.create({
      content: 'Loading, Please Wait...'
    });
    loading.present();

    firebase.database().ref().on('value', snapshot => {
      this.role = snapshot.child(firebase.auth().currentUser.uid).child('role').val();
      this.items = [];

      if (this.role == 'Employee') {
        snapshot.child(firebase.auth().currentUser.uid).child('forms').forEach(childSnapshot => {

          console.log("Looping current user");
          if (navParams.get('approved') == childSnapshot.child('approved').val()) {
            console.log(childSnapshot.key);
            this.items.push(childSnapshot);
          }
          return false;
        });
      } else {
        console.log("looping all users");
        snapshot.forEach(user => {
          user.child('forms').forEach(form => {
            if (navParams.get('approved') == form.child('approved').val()) {
              console.log(form.key);
              this.items.push(form);
            }
            return false;
          })
          return false;
        })
      }
      loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateFormPage');
  }

  click(item: firebase.database.DataSnapshot) {
    console.log(item.key);

    let _item = item.val();

    data.key = item.key;
    data.employee = {
      title: _item.title,
      company_name: _item.company_name,
      pid: _item.pid,
      department: _item.department,
      purpose: _item.purpose,
      work_done: _item.work_done,
      future_remarks: _item.future_remarks,
      pending_work: _item.pending_work,
      client_remark: _item.client_remark,
      rating: _item.rating,
    };
    data.client = {
      client_name: _item.client_name,
      designation: _item.designation,
      contact_no: _item.contact_no,
    };
    data.signature = {
      client_signature: _item.client_signature,
      emp_signature: _item.emp_signature,
    };


    if (this.role != 'Employee' || this.navParams.get('approved') == true) {
      console.log("role = " + this.role);
      console.log("approved = " + this.navParams.get('approved'));

      this.navCtrl.push(DisplayFormPage, {
        approved: this.navParams.get('approved')
      });
    }
    else
      this.navCtrl.push(NewFormPage, {
        data: true
      });
  }

}
