import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { ListPage } from '../list/list';
import { TasksPage } from '../tasks/tasks';
import { DatabaseProvider } from '../../providers/database/database';
import { CreateTaskPage } from '../create-task/create-task';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = {} as User;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    /*private db: DatabaseProvider*/) {
      
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
