import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public taskProv: TaskProvider,
    private modalCtrl: ModalController,
    private speech: SpeechProvider,
    private auth: AuthProvider) {
      this.auth.fireState()
      .on('value', snap =>{
        if(snap.val() === true){
          this.speech.speakMessage("Welcome, Wired Martian");
        } else {
          this.speech.speakMessage("You're offline. Your list will sync when your connection is available");
        }
      })
  }

  ionViewDidLoad() {
    this.taskProv.getTasks().subscribe(res =>{
      this.tasks = res;
      /*let item = this.taskProv.getTaskById('-L5eGb8yoXZoFeqQxR7r')
      .once('value').then(snapshot =>{
        console.log(snapshot.val());
      })*/
      //console.log(item);
    },(err) =>{
      console.log(err);
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
