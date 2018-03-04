import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User, Profile } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AuthProvider {
  constructor(public auth: AngularFireAuth, private toastCtrl: ToastController) {
    this.dbConnectionSate();
  }

  onSignUp(user: User): Promise<any>{
    
    let promise = new Promise((resolve, reject) =>{
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() =>{
        resolve(true);
      }).catch((err) =>{
        reject(err);
      })
    })
    return promise;
  }
  onSignIn(user: User) : Promise<any>{
    let promise = new Promise((resolve, reject) =>{
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() =>{
        resolve(true);
      }).catch((err) =>{
        reject(err);
      })
    })
    return promise;
  }

  onSignOut() : Promise<any>{
    let promise = new Promise((resolve, reject) =>{
      firebase.auth().signOut()
      .then(() =>{
        resolve(true);
      }).catch((err) =>{
        reject(err);
      })
    })
    return promise;
  }

  onGetUid() : string{
    return firebase.auth().currentUser.uid;
  }

  getUserByUid(uid: string){
    return firebase.database().ref(`/users/${uid}`);
  }

  getLoggedUser(){
    return firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
  }

  updateUserProfile(profile: Profile){
    let Uid =  this.onGetUid();
    let user = this.getUserByUid(Uid);
    return user.update(profile);
  }
/** redundancy */
  dbConnectionSate(){
    let connectedRef = firebase.database().ref(".info/connected");
      connectedRef.on('value', snapshot =>{
        if(snapshot.val() === true){
          this.toastMessage('connected');
          return true;
        } else {
          this.toastMessage('no connection');
          return false;
        }
      });
  }

  get Session(){
    return this.auth.authState;
  }

  fireState(){
    return firebase.database().ref(".info/connected");
  }
  toastMessage(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    }).present();
  }
}
