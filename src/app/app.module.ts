import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { MomentModule } from 'angular2-moment';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SigninPage } from '../pages/signin/signin';
import { TaskProvider } from '../providers/task/task';
import { CreateTaskPage } from '../pages/create-task/create-task';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { TasksPage } from '../pages/tasks/tasks';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { TaskDetailsPage } from '../pages/task-details/task-details';
import { SpeechProvider } from '../providers/speech/speech';
import { UserfeedbackProvider } from '../providers/userfeedback/userfeedback';
import { EditTaskPage } from '../pages/edit-task/edit-task';
import { SignupPage } from '../pages/signup/signup';
import { PopoverPage } from '../pages/popover/popover';
import { ProfilePage } from '../pages/profile/profile';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { PostProvider } from '../providers/post/post';
import { UploadProvider } from '../providers/upload/upload';
import { Camera } from '@ionic-native/camera';


firebase.initializeApp(environment.firebase);
/*
firebase.firestore().enablePersistence()
  .then(() => {
      // Initialize Cloud Firestore through firebase
      firebase.firestore();
  }).catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log('failed precondition');
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log('unimplemented');
      }
  });
  */
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    CreateTaskPage,
    TasksPage,
    TaskDetailsPage,
    EditTaskPage,
    PopoverPage,
    ProfilePage,
    CreateProfilePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    MomentModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    SignupPage,
    CreateTaskPage,
    TasksPage,
    TaskDetailsPage,
    EditTaskPage,
    PopoverPage,
    ProfilePage,
    CreateProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TaskProvider,
    SQLite,
    DatabaseProvider,
    TextToSpeech,
    SpeechProvider,
    UserfeedbackProvider,
    PostProvider,
    UploadProvider,
    Camera
  ]
})
export class AppModule {}
