import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { ListPage } from '../list/list';
import { TasksPage } from '../tasks/tasks';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = {} as User;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider) {
  }

  signIn(){
    this.auth.onSignIn(this.data).then(res =>{
      if(!res.code){
        console.log(this.auth.onGetUid());
        this.navCtrl.setRoot(TasksPage);
      }
    }).catch((err) =>{
      console.log(err);
    })
  }

}
