import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
import { DatabaseProvider } from '../../providers/database/database';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';
import { AuthProvider } from '../../providers/auth/auth';
import { SpeechProvider } from '../../providers/speech/speech';

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
    public taskProv: TaskProvider,
    private dataProv: DatabaseProvider,
    private feedback: UserfeedbackProvider,
    private auth: AuthProvider,
    private speech: SpeechProvider) {
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
    }, () =>{
      //
    })
  }

  loadFirebaseTasks(){
    this.taskProv.getTasks().subscribe(res =>{
      this.tasks = res;
    });
  }

  addTask(){
    this.taskProv.createTask(this.task)
    .then(() =>{
      this.feedback.toastMessage('task successfully saved');
      this.navCtrl.pop();
    }, () =>{
      this.auth.fireState()
      .on('value', snap =>{
        if(snap.val() === false){
          /** user is offline */
          this.speech.speakMessage("your task has been saved. your data will sync once you're online.")
          this.navCtrl.pop();
        }
      });
    });
  }
}
