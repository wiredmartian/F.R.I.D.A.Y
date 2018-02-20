import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailsPage } from './task-details';

@NgModule({
  declarations: [
    TaskDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailsPage),
  ],
})
export class TaskDetailsPageModule {}
