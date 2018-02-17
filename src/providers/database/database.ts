import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';
import { Task } from '../../models/task';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private dbState: BehaviorSubject<boolean>;

  constructor(public http: Http, private sqlite: SQLite, private platform: Platform) {
    this.dbState = new BehaviorSubject(false);
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'wiredtodos.db',
        location: 'default'
      })
      .then((db: SQLiteObject) =>{
        this.database = db;
        this.dbState.next(true);
        this.initDB();
      })
      .catch((err) => {
        console.log('error ', err);
      })
    })
  }

  getDatabaseState(){
    return this.dbState.asObservable();
  }

  addTask(t: Task){
    let task = [];
    let query = 'INSERT INTO tasks (uid, title, description, type, startDate, completeDate, isDone) VALUES(?,?,?,?,?,?,?)';
    this.database.executeSql(query,[t.uid, t.title, t.description, t.type, t.start, t.complete, t.isdone]);
  }

  initDB(){
    this.database.executeSql("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, title TEXT, description TEXT, type TEXT, startDate Integer, completeDate Integer, isDone)", []);
    console.log('tasks created');
  }

  addUser(){
    this.database.executeSql("CREATE TABLE IF NOT EXISTS developer (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, email TEXT, about TEXT, photo TEXT)",[]);
    console.log('user added');
  }

}
