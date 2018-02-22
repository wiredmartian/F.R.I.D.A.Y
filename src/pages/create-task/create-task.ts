import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
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
    private toastCtrl: ToastController,
    public taskProv: TaskProvider,
    private dataProv: DatabaseProvider) {
      this.dataProv.getDatabaseState().subscribe(rdy =>{
        if(rdy){
          //this.loadSQLiteTasks();
        }
      },error =>{
        //this.toastMessage('ready state error');
      })
  }

  loadSQLiteTasks(){
    this.dataProv.getTasks().then(res =>{
      this.tasks = res;
      this.toastMessage('hit sql ' + res.length)
    }, error =>{
      this.toastMessage('rejected');
    })
  }

  loadFirebaseTasks(){
    this.taskProv.getTasks().subscribe(res =>{
      this.toastMessage('loading from firebase...');
      this.tasks = res;
    })
  }

  addTask(){
    this.taskProv.createTask(this.task)
    .then(res =>{
      /*this.tasks.push(this.task);
      this.task.title = '';
      this.task.type = '';
      this.task.description = '';
      this.task.complete = '';
      this.task.start = ''; */
      this.navCtrl.pop();
    }, err =>{
      console.log('rejected');
    })
  }

  toastMessage(msg: string){
    this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    }).present();
  }
}
