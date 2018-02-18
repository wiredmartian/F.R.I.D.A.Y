import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  tasks: any[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public taskProv: TaskProvider) {
  }

  ionViewDidLoad() {
    this.taskProv.getTasks().subscribe(res =>{
      this.tasks = res
    },(err) =>{
      console.log(err);
    })
  }

}
