import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { ListPage } from '../list/list';
import { SigninPage } from '../signin/signin';
import { TasksPage } from '../tasks/tasks';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public auth: AuthProvider) {
      //this.navCtrl.setRoot(TasksPage);
  }

  signUp(){
    this.auth.onSignUp(this.data).then((res) =>{
      if(!res.code){
        console.log(res);
        this.navCtrl.setRoot(ListPage);
      }
    }).catch((err) =>{
      console.log(err);
    })
  }

  viewSignIn(){
    this.navCtrl.push(SigninPage);
  }


}
