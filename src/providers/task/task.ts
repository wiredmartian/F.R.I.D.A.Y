import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class TaskProvider {
  uid : string = '';
  ref : firebase.database.Reference = firebase.database().ref();

  constructor(public http: Http, 
    public auth: AuthProvider,
    public firedb: AngularFireDatabase) {
    this.uid = auth.onGetUid();
  }

  createTask(task: Task){
    let uid = this.auth.onGetUid();
    task.isdone = false;
    let key = this.ref.child(`/tasks/${uid}`).push(task).key;
    task.taskid = key;
    return this.ref.child(`/tasks/${uid}/${key}`)
    .update(task);
  }
  getTasks(){
    return this.firedb.list(`/tasks/${this.uid}`).valueChanges();
  }

  removeTask(taskId){
    return this.ref.child(`/tasks/${this.uid}/${taskId}`).remove();
  }

  getTaskById(taskId){
    return this.ref.child(`/tasks/${this.uid}/${taskId}`);
  }
}
