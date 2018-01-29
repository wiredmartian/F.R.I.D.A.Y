import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

/*
  Generated class for the TaskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskProvider {
  uid : string = '';

  constructor(public http: Http, 
    public auth: AuthProvider,
    public firedb: AngularFireDatabase) {
    this.uid = auth.onGetUid();
  }

  createTask(task: Task){
    let uid = this.auth.onGetUid();
    return firebase.database().ref().child(`/tasks/${uid}`).push(task);
  }
  getTasks(){
    return this.firedb.list(`/tasks/${this.uid}`).valueChanges();
  }
}
