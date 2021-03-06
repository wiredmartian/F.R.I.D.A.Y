import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Task } from '../../models/task';
import { TaskProvider } from '../../providers/task/task';
import { UserfeedbackProvider } from '../../providers/userfeedback/userfeedback';
import { SpeechProvider } from '../../providers/speech/speech';
import { EditTaskPage } from '../edit-task/edit-task';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  task: Task
  icon: string = 'assets/img/';
  audiocontrol: string = "assets/img/play.png";
  count: number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _task: TaskProvider,
    private feedback: UserfeedbackProvider,
    private speech: SpeechProvider,
    private modalCtrl: ModalController) {
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
    let descript = "You've logged a " + this.task.type + " item titled " + this.task.title + " with a " + this.task.priority
    + ". This activity is set to start on " + this.task.start + ". And be completed on " + this.task.complete
    + ". Description. " + this.task.description;
    if(this.count == 0){ /** user just clicked play */
      this.count = 1;
      this.audiocontrol = "assets/img/pause.png";
      this.speech.speakMessage(descript.toString())
      .then(() => {
        console.log('done reading');
      });
    } else{
      this.stopReading();
    }
    
  }

  stopReading(){
    this.count = 0;
    this.audiocontrol = "assets/img/play.png";
    this.speech.stopMessage().then(() =>{
      console.log('stopped');
    });
  }

  taskComplete(task: Task){
    this._task.taskComplete(task)
    .then(() =>{
      this.speech.speakMessage('Task Completed!');
      this.navCtrl.pop();
    }, () =>{
      this.navCtrl.pop();
    });
  }

  editTask(task: Task){
    this.modalCtrl.create(EditTaskPage, {task: task})
    .present();
  }
}
