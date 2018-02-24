import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { CreateTaskPage } from '../create-task/create-task';
import { TaskDetailsPage } from '../task-details/task-details';
import { SpeechProvider } from '../../providers/speech/speech';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  tasks: any[];
  icon: string = 'assets/img/';
  constructor(
    public navCtrl: NavController, 
    public taskProv: TaskProvider,
    private modalCtrl: ModalController,
    private speech: SpeechProvider,
    private auth: AuthProvider) {
  }

  ionViewDidEnter() {
    this.auth.Session.subscribe(session =>{
      if(session){
        this.taskProv.getTasks(session.uid).subscribe(res =>{
          this.tasks = res;
        }, () =>{
          this.speech.speakMessage("Failed to fetch tasks.");
        });
      }
    }) 
  }

  addTask(){
    this.modalCtrl.create(CreateTaskPage)
    .present();
  }

  viewTask(task: Task){
    this.modalCtrl.create(TaskDetailsPage,{ data: task })
    .present();
  }

}
