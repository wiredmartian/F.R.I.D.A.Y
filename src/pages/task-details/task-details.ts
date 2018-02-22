import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskProvider } from '../../providers/task/task';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';
import { SpeechProvider } from '../../providers/speech/speech';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  task: Task
  icon: string = 'assets/img/';
  play_pause: string = "play";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _task: TaskProvider,
    private feedback: UserfeedbackProvider,
    private speech: SpeechProvider) {
    this.task = navParams.get('data');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  deleteTask(taskid){
    if(taskid){
      this._task.removeTask(taskid);
      this.feedback.toastMessage('Item successfully removed');
      this.navCtrl.pop();
    }
  }

  readTask(){
    let descript = "You've logged a " + this.task.type + " item titled " + this.task.title 
    + " set to start " + this.task.start + " and be complete by " + this.task.complete
    + " ... description: " + this.task.description;
    if(this.play_pause == "play"){
      this.play_pause = "pause";
      this.speech.speakMessage(descript.toString())
      .then(() => {
        console.log('done reading');
      });
    } else {
      this.stopReading();
    }
  }

  stopReading(){
    this.play_pause = "play";
    this.speech.stopMessage().then(() =>{
      console.log('stopped');
    });
  }
}
