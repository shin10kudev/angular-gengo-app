import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Mistake } from './mistake';

@Injectable()
export class MistakeService {

  private basePath: string = '/mistakes';
  userId: string;

  mistakes: FirebaseListObservable<Mistake[]> = null; //  list of objects

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getMistakesList(query={}): FirebaseListObservable<Mistake[]> {
    if (!this.userId) return;
    this.mistakes = this.db.list(`${this.basePath}/${this.userId}`, {
      query: query
    });
    return this.mistakes;
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
