import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Translation } from '../shared/translation';

@Injectable()
export class TranslationService {

  translations: FirebaseListObservable<Translation[]> = null; //  list of objects
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getTranslationsList(query={}): FirebaseListObservable<Translation[]> {
    if (!this.userId) return;
    this.translations = this.db.list(`translations/${this.userId}`, {
      query: query
    });
    return this.translations
  }

  createTranslation(translation): FirebaseObjectObservable<any> {
    // create new translation, then return it as an object observable
    const key = this.db.list(`/translations/${this.userId}`).push(translation).key
    return this.db.object(`translations/${this.userId}/${key}`)
  }

  // Update an exisiting translation
  updateTranslation(key: string, translation: Translation): void {
    this.translations.update(key, translation)
      .catch(error => this.handleError(error))
  }

  // Deletes a single item
  deleteTranslation(key: string): void {
    this.translations.remove(key)
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }
}
