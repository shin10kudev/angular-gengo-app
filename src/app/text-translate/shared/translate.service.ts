import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class TranslateService {

  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  createTranslation(text: string): FirebaseObjectObservable<any> {
    // create new translation, then return it as an object observable
    const data = { 'english': text }
    const key = this.db.list(`/translations/${this.userId}`).push(data).key
    return this.db.object(`translations/${key}`)
  }
}
