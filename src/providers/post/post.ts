import { Injectable } from '@angular/core';
import { Event } from '../../models/post';
import { User } from '../../models/user';
import { UserfeedbackProvider } from '../userfeedback/userfeedback';
import { AuthProvider } from '../auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class PostProvider {
  user: firebase.User;
  constructor(
    private feedback: UserfeedbackProvider,
    private auth: AuthProvider,
    private firedb: AngularFireDatabase
  ){ 
    this.user = firebase.auth().currentUser;
  }

  addEvent(event: Event){
    return firebase.database().ref(`/events/${this.user.uid}`).push(event);
  }

  removeEvent(id: string){
    return firebase.database().ref(`/events/${this.user.uid}/${id}`).remove();
  }

  updateEvent(event: Event){
    return firebase.database().ref(`/events/${this.user.uid}/${event.id}`)
    .update(event);
  }
  getEvents(){
    return this.firedb.list(`/events`).valueChanges();
  }

  getUserEvents(id: string){
    return this.firedb.list(`/events/${id}`).valueChanges();
  }

  getOneEvent(eventid: string){
    return firebase.database().ref(`/events/${this.user.uid}/${eventid}`)
    .once('value', (snapshot) => {
      return snapshot.val();
    });
  }
}
