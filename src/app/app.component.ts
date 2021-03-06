import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import * as firebase from 'firebase';
import { TasksPage } from '../pages/tasks/tasks';
import { SigninPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Me', component: ProfilePage },
      { title: 'Tasks', component: TasksPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.hideSplashScreen();
      //this.splashScreen.hide();
      this.fireAuthStateChange();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  fireAuthStateChange(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.nav.setRoot(TasksPage);
      } else {
        this.nav.setRoot(SigninPage);
      }
    })
  }

  hideSplashScreen() {
    if (this.splashScreen) {
        setTimeout(() => {
            this.splashScreen.hide();
        }, 100);
    }
}
}
