import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  task: Task
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = navParams.get('data');
  }

  closeModal(){
    this.navCtrl.pop();
  }
}
