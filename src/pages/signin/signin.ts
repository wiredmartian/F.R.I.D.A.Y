import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    private feedback: UserfeedbackProvider) {   
  }

  signIn(){
    this.feedback.presentLoading();
    this.auth.onSignIn(this.data).then(res =>{
        this.feedback.dismissLoading();
        this.navCtrl.setRoot(TasksPage);
    },(err) =>{
      this.feedback.dismissLoading();
      this.feedback.toastMessage('Email or password incorrect.');
    });
  }
}
