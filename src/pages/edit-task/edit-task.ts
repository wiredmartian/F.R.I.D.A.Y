import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskProvider } from '../../providers/task/task';
import { SpeechProvider } from '../../providers/speech/speech';

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage {
  task = {} as Task;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private taskProv: TaskProvider,
    private speech: SpeechProvider) {
    this.task = navParams.get('task');
  }

  updateTask(){
    if(this.task){
      this.taskProv.updateTask(this.task)
      .then(() =>{
        this.speech.speakMessage('Task updated!');
        this.navCtrl.pop();
      }, () =>{
        /** offline maybe */
        this.navCtrl.pop();
      })
    }
  }
}
