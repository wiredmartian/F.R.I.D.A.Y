import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CreateProfilePage } from '../create-profile/create-profile';
import { Profile } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { UploadProvider } from '../../providers/upload/upload';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = {} as Profile;
  constructor(private modalCtrl: ModalController, private auth: AuthProvider, private upload: UploadProvider) {
  }

  ionViewDidEnter(){
    this.auth.getLoggedUser()
    .once('value', (userdata) =>{
      this.user = userdata.val();
    });
  }

  presentEditUser(){
    this.modalCtrl.create(CreateProfilePage)
    .present();
  }

  seletImage(){
    this.upload.selectImage()
    .then(() =>{

    }).catch(() => {

    })
  }


}
