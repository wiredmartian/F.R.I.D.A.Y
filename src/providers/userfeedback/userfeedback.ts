import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class UserfeedbackProvider {
  constructor(private toastCtrl: ToastController) {
    
  }
  toastMessage(msg: string){
    this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}
