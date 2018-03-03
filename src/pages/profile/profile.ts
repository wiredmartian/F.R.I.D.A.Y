import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CreateProfilePage } from '../create-profile/create-profile';
import { Profile } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {} as Profile;
  constructor(private modalCtrl: ModalController, private auth: AuthProvider) {
  }

  ionViewDidEnter(){
    this.auth.getLoggedUser()
    .on('value', (userdata) =>{
      this.user = userdata.val();
    });
  }

  presentEditUser(){
    this.modalCtrl.create(CreateProfilePage)
    .present();
  }


}
