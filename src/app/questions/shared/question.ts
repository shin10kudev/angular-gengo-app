import * as firebase from "firebase";

export class Question {
  $key: string;
  question: string;
  answer: string;
  plus_alpha: string;
  notes: string;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
}
