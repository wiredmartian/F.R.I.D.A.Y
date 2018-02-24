import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { SigninPage } from '../signin/signin';
import { TasksPage } from '../tasks/tasks';
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
    private feeback: UserfeedbackProvider,
    private loadingCtrl: LoadingController) {
      
  }

  signUp(){

    let loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'dots'
    });
    loading.present();
    this.auth.onSignUp(this.data)
    .then(() =>{
        loading.dismiss();
        this.navCtrl.setRoot(TasksPage);
    }, (err) =>{
      loading.dismiss();
      this.feeback.toastMessage(err.message);
    });
  }

  viewSignIn(){
    this.navCtrl.push(SigninPage);
  }
}
