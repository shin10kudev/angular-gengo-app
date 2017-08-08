import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Feedback } from './feedback';

@Injectable()
export class FeedbackService {

  private basePath: string = '/feedbacks';

  feedbacks: FirebaseListObservable<Feedback[]> = null; //  list of objects
  userId: string;
  userEmail: string;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
        this.userEmail = user.email;
      }
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getFeedbacksList(query={}): FirebaseListObservable<Feedback[]> {
    if (!this.userId) return;
    this.feedbacks = this.db.list(`${this.basePath}/${this.userId}`, {
      query: query
    });
    return this.feedbacks;
  }

  // Create a new feedback item
  createFeedback(feedback: Feedback): void {
    feedback.userEmail = this.userEmail;
    this.feedbacks.push(feedback)
      .catch(error => this.handleError(error))
  }

  // Update a feedback
  updateFeedback(key: string, feedback: Feedback): void {
    this.feedbacks.update(key, feedback)
      .catch(error => this.handleError(error))
  }

  // Delete feedback
  deleteFeedback(key: string): void {
    this.feedbacks.remove(key)
      .catch(error => this.handleError(error))
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }
}
