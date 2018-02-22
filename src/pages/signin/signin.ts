import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { TasksPage } from '../tasks/tasks';
import { SpeechProvider } from '../../providers/speech/speech';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = {} as User;
  accepted: string = 'Access Granted. Welcome';
  denied: string = 'Access Denied. Your email or password is incorrect';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    private speech: SpeechProvider) {
      
  }

  signIn(){
    this.auth.onSignIn(this.data).then(res =>{
      if(!res.code){
        this.speech.speakMessage(this.accepted);
          this.navCtrl.setRoot(TasksPage);
        } else {
          this.speech.speakMessage(this.denied);
        }
    }).catch((err) =>{
      this.speech.speakMessage(this.denied);
    })
  }

}
