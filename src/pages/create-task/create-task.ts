import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { TasksPage } from '../tasks/tasks';

/**
 * Generated class for the CreateTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  task = {} as Task
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taskProv: TaskProvider) {
  }

  createTask(){
    this.taskProv.createTask(this.task).then(()=>{
      this.navCtrl.push(TasksPage);
    },(err)=>{
      console.log(err);
    })
  }
}
