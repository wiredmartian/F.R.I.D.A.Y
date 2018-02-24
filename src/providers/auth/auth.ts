import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(public auth: AngularFireAuth, private toastCtrl: ToastController, private storage: Storage) {
    this.dbConnectionSate();
  }

  onSignUp(user: User): Promise<any>{
    
    let promise = new Promise((resolve, reject) =>{
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) =>{
        console.log(res);
        this.setUserStorageDetails(res.Uid);
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
      .then((res) =>{
        if(this.getUserStorageUid().length == 0){
          this.setUserStorageDetails(res.Uid);
        }
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

  updateUserProfile(newUser: User){
    let currentUid = this.onGetUid();
    let user = this.getUserByUid(currentUid);
    user.set({
      displayName: newUser.displayName,
      about: newUser.about
    }).then((res)=>{
      console.log(res);
    }).catch((err) =>{
      console.log(err);
    })
  }
/** redundancy */
  dbConnectionSate(){
    let connectedRef = firebase.database().ref(".info/connected");
      connectedRef.on('value', snapshot =>{
        if(snapshot.val() === true){
          this.toastMessage('database online');
          return true;
        } else {
          this.toastMessage('database offline');
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

  setUserStorageDetails(Uid){
      this.storage.set('userId', Uid);
      this.storage.set('auth', true);
  }
  getUserStorageUid() : string{
    this.storage.get('userId')
      .then((val) =>{
        if(val){
          return val;
        }
      },() =>{
        return null;
      });
      return null;
  }

  toastMessage(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    }).present();
  }
}
