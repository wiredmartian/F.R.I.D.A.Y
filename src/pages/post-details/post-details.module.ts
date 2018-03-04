import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDetailsPage } from './post-details';

@NgModule({
  declarations: [
    PostDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDetailsPage),
  ],
})
export class PostDetailsPageModule {}
