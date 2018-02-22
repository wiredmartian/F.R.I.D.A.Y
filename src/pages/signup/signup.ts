import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { SigninPage } from '../signin/signin';
import { TasksPage } from '../tasks/tasks';
import { SpeechProvider } from '../../providers/speech/speech';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  data = {} as User;
  constructor(
    public navCtrl: NavController, 
    public auth: AuthProvider,
    private speech: SpeechProvider,
    private feeback: UserfeedbackProvider) {
      
  }

  signUp(){
    if(!this.validateCredentials()){
      return;
    }
    this.feeback.presentLoading();
    this.auth.onSignUp(this.data)
    .then(() =>{
        this.feeback.dismissLoading();
        this.navCtrl.setRoot(TasksPage);
    }, () =>{
      this.feeback.dismissLoading();
      this.feeback.toastMessage('Registration failed. Check your inputs and try again');
    });
  }

  viewSignIn(){
    this.navCtrl.push(SigninPage);
  }

  validateCredentials(){
    if(this.data.password == '' || this.data.email == ''){
      return false;
    }
  }
}
