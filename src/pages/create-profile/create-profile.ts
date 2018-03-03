import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Profile } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {
  user = {} as Profile;
  constructor(private navCtrl: NavController, private auth: AuthProvider, private feeback: UserfeedbackProvider) {
  }

  updateUser(){
    this.auth.updateUserProfile(this.user)
    .then(() => {
      this.navCtrl.pop();
    })
    .catch((err) => {
      this.feeback.toastMessage(err.message);
      this.navCtrl.pop();
    });
  }

}
