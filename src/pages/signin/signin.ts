import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { TasksPage } from '../tasks/tasks';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = {} as User;
  
  constructor(
    private navCtrl: NavController, 
    private auth: AuthProvider,
    private feedback: UserfeedbackProvider,
    private loadingCtrl: LoadingController) {   
  }

  signIn(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loading.present();
    this.auth.onSignIn(this.data).then(res =>{
        loading.dismiss()
        this.navCtrl.setRoot(TasksPage);
    },(err) =>{
      loading.dismiss();
      this.feedback.toastMessage('Email or password incorrect.');
    });
  }
}
