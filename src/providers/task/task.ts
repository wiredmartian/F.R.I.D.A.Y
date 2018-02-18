import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class TaskProvider {
  uid : string = '';

  constructor(public http: Http, 
    public auth: AuthProvider,
    public firedb: AngularFireDatabase,
    private db: DatabaseProvider) {
    this.uid = auth.onGetUid();
  }

  createTask(task: Task){
    let uid = this.auth.onGetUid();
    task.uid = uid;
    task.isdone = false;
    return firebase.database().ref().child(`/tasks/${uid}`).push(task)
    .then(() =>{
      this.db.addTask(task);
    }, err =>{
      console.log('rejected');
    })
  }
  getTasks(){
    return this.firedb.list(`/tasks/${this.uid}`).valueChanges();
  }
}
