import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { TasksPage } from '../tasks/tasks';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  task = {} as Task
  tasks : any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taskProv: TaskProvider,
    private dataProv: DatabaseProvider) {
      this.dataProv.getDatabaseState().subscribe(rdy =>{
        if(rdy){
          console.log('localdb ready');
        }
      })

      this.loadFirebaseTasks();
  }

  loadUserTasks(){
    this.dataProv.getTasks().then(data =>{
      this.tasks = data;
    });
  }

  loadFirebaseTasks(){
    this.taskProv.getTasks().subscribe(res =>{
      this.tasks = res;
    })
  }
  addTask(){
    this.taskProv.createTask(this.task)
    .then(res =>{
      this.task.title = '';
      this.task.type = '';
      this.task.description = '';
      this.task.complete = '';
      this.task.start = '';
      console.log('new task pushed');
    }, err =>{
      console.log('rejected');
    })
  }
}
