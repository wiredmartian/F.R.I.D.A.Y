import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTaskPage } from './create-task';

@NgModule({
  declarations: [
    CreateTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTaskPage),
  ],
})
export class CreateTaskPageModule {}
