import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Mistake } from './mistake';
import { ToastService } from '../../ui/toast-messages/shared/toast.service';

@Injectable()
export class MistakeService {

  private basePath: string = '/mistakes';
  userId: string;
  mistakes: FirebaseListObservable<Mistake[]> = null; //  list of objects

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private toast: ToastService) {
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

  // Create a new mistake
  createMistake(mistake: Mistake): void {
    this.mistakes.push(mistake)
      .catch(error => this.handleError(error))
  }

  // Update a mistake
  updateMistake(key: string, mistake: Mistake): void {
    this.mistakes.update(key, mistake)
      .catch(error => this.handleError(error))
  }

  // Delete mistake
  deleteMistake(key: string): void {
    this.mistakes.remove(key)
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    this.toast.sendMessage(error.message, 'warning');
  }
}
