import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';


@Injectable()
export class UserfeedbackProvider {
  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    
  }
  defaultLoading(){
    return this.loadingCtrl.create({
      content: 'Please wait...',
    });
  }
  presentLoading(){
    this.defaultLoading()
    .present();
  }
  dismissLoading(){
    this.defaultLoading()
    .dismiss();
  }

  toastMessage(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    }).present();
  }
}
