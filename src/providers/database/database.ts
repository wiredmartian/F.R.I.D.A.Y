import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';
import { Task } from '../../models/task';
import { User } from '../../models/user';


@Injectable()
export class DatabaseProvider {
  tasks: Task[];
  database: SQLiteObject;
  private dbState: BehaviorSubject<boolean>;

  constructor(public http: Http, private sqlite: SQLite, private platform: Platform, private toastCtrl: ToastController) {
    this.dbState = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
        this.sqlite.create({
          name: 'devtodos.db',
          location: 'default'
        })
        .then((db: SQLiteObject) =>{
          this.database = db;
          this.dbState.next(true);
          this.initDB();
          this.createUser();
          this.toastMessage('db created');

        }, err =>{
          this.toastMessage('db init rejected');
        })
        .catch((err) => {
          this.toastMessage('error occured while creating db');
        })
    })
  }

  getDatabaseState(){
    return this.dbState.asObservable();
  }

  addTask(t: Task){
    let query = 'INSERT INTO tasks (uid, title, description, type, start, complete, isdone) VALUES(?,?,?,?,?,?,?)';
    return this.database.executeSql(query,[t.uid, t.title, t.description, t.type, t.start, t.complete, t.isdone])
    .then(res =>{
      this.toastMessage('task successfully inserted');
      return res;
    }, err =>{
      this.toastMessage('failed to insert task');
    })
  }

  getTasks() : Task[]{
    let query = "SELECT * FROM tasks";
    this.database.executeSql(query,[]).then(res =>{
      if(res.rows.length > 0){
        this.toastMessage('fetching records...');
        for(var i = 0; i < res.rows.length; i++){
          let task = {
            'uid': res.rows.item(i).uid,
            'title': res.rows.item(i).title,
            'description': res.rows.item(i).description,
            'start': res.rows.item(i).start,
            'complete': res.rows.item(i).complete,
            'isdone': res.rows.item(i).isdone,
            'type': res.rows.item(i).type,
          }
          this.toastMessage(task.title);
          this.tasks.push(task);
        }
      }
      return this.tasks;
    }, err =>{
      this.toastMessage('failed to get db tasks');
      return [];
    })
    return this.tasks;
  }

  initDB(){
    return this.database.executeSql("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, title TEXT, description TEXT, type TEXT, start TEXT, complete TEXT, isdone)", [])
    .then(res => {
      return res;
    })
    .catch(err =>{
      console.log('error', err);
    })
  }

  createUser(){
    this.database.executeSql("CREATE TABLE IF NOT EXISTS developer (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, email TEXT, about TEXT, photo TEXT)",[]);
  }

  insertUser(user: User){
    let query = 'INSERT INTO developer (uid, email, about, photo) VALUES(?,?,?,?)';
    this.database.executeSql(query, [user.Uid, user.email, user.about, user.photoURL])
    .then(res =>{
      this.toastMessage('inserted user');
      return res;
    }, err =>{
      this.toastMessage('failed to insert user to db');
    })
  }

  getDBUser() : boolean{
    let query = 'SELECT * FROM developer';
    this.database.executeSql(query,[])
    .then(res => {
      if(res.rows.length > 0){
        this.toastMessage('user exists');
        return true;
      }
    }, err =>{
      this.toastMessage('unable to find user');
    });
    return false;
  }

  toastMessage(msg: string){
    this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    }).present();
  }
}
