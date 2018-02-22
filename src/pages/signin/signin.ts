import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { TasksPage } from '../tasks/tasks';

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
        /*this.db.getDBUser().then(exists =>{
          if(!exists){
            this.db.insertUser(res);
          } */
          this.navCtrl.setRoot(TasksPage);
        }
    }).catch((err) =>{
      console.log(err);
    })
  }

}
