import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskProvider } from '../../providers/task/task';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  task: Task
  icon : string = 'assets/img/';
  constructor(public navCtrl: NavController, public navParams: NavParams, private _task: TaskProvider, private toastCtrl: ToastController) {
    this.task = navParams.get('data');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  deleteTask(taskid){
    if(taskid){
      this._task.removeTask(taskid);
      this.toastMessage('task removed');
      this.navCtrl.pop();
    }
  }

  toastMessage(msg: string){
    this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    }).present();
  }
}
