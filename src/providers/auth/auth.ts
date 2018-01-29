import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public auth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
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
}
