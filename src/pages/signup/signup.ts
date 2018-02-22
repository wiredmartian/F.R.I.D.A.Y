import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { ListPage } from '../list/list';
import { SigninPage } from '../signin/signin';
import { TasksPage } from '../tasks/tasks';
import { SpeechProvider } from '../../providers/speech/speech';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  data = {} as User;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    private speech: SpeechProvider) {
      
  }

  ionViewDidEnter(){
    this.speech.speakMessage('Please sign up or sign in to continue to your todo list');
  }
  signUp(){
    this.auth.onSignUp(this.data).then((res) =>{
      if(!res.code){
        console.log(res);
        this.navCtrl.setRoot(ListPage);
      }
    }).catch((err) =>{
      this.speech.speakMessage('Registration failed');
      console.log(err);
    })
  }

  viewSignIn(){
    this.navCtrl.push(SigninPage);
  }


}
