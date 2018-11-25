import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Question } from "./question";
import { ToastService } from "../../ui/toast-messages/shared/toast.service";

@Injectable()
export class QuestionService {
  private basePath: string = "/questions";

  questions: FirebaseListObservable<Question[]> = null; // list of objects
  userId: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getQuestionsList(query = {}): FirebaseListObservable<Question[]> {
    if (!this.userId) return;
    this.questions = this.db.list(`${this.basePath}/${this.userId}`, {
      query: query
    });
    return this.questions;
  }

  // Create a question
  createQuestion(question: Question): void {
    this.questions
      .push(question)
      .then(() => this.toast.sendMessage("New question created!", "success"))
      .catch(error => this.handleError(error));
  }

  // Update a question
  updateQuestion(key: string, question: Question): void {
    this.questions
      .update(key, question)
      .catch(error => this.handleError(error));
  }

  // Delete a question
  deleteQuestion(key: string): void {
    this.questions
      .remove(key)
      .then(() => this.toast.sendMessage("Question deleted", "info"))
      .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    this.toast.sendMessage(error.message, "warning");
  }
}
