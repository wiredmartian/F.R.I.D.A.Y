import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { DateTime } from 'ionic-angular';

@Injectable()
export class TaskProvider {
  uid: string = '';
  ref : firebase.database.Reference = firebase.database().ref();

  constructor(public http: Http, 
    public auth: AuthProvider,
    public firedb: AngularFireDatabase) {
      this.auth.Session.subscribe(res =>{
        if(res){
          this.uid = res.uid;
        }
      });
  }
  createTask(task: Task){
    task.isdone = false;
    let key = this.ref.child(`/tasks/${this.uid}`).push(task).key;
    task.taskid = key;
    return this.ref.child(`/tasks/${this.uid}/${key}`)
    .update(task);
  }
  getTasks(uid: any){
    this.uid = uid;
    return this.firedb.list(`/tasks/${this.uid}`).valueChanges();
  }

  removeTask(taskId){
    return this.ref.child(`/tasks/${this.uid}/${taskId}`).remove();
  }

  getTaskById(taskId){
    return this.ref.child(`/tasks/${this.uid}/${taskId}`);
  }

  taskComplete(task: Task){
    task.isdone = true;
    task.date_complete = Date.now();
    return this.getTaskById(task.taskid)
    .set(task);
  }

  updateTask(task: Task){
    return this.getTaskById(task.taskid).set(task);
  }
}
