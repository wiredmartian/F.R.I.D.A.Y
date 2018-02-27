import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task/task';
import { Task } from '../../models/task';
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
  constructor(
    public navCtrl: NavController, 
    public taskProv: TaskProvider,
    private feedback: UserfeedbackProvider,
    private auth: AuthProvider,
    private speech: SpeechProvider) {
  }

  addTask(formTask){
    this.taskProv.createTask(this.task)
    .then(() =>{
      this.feedback.toastMessage('task successfully saved');
      this.navCtrl.pop();
    }, () =>{
      this.auth.fireState()
      .on('value', snap =>{
        if(snap.val() === false){
          this.speech.speakMessage("your task has been saved. your data will sync once you're online.")
          this.navCtrl.pop();
        }
      });
    });
  }
}
