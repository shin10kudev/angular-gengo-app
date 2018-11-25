import * as firebase from "firebase";

export class Question {
  $key: string;
  question_text: string;
  answer_text: string;
  variations: string;
  notes: string;
  liked: boolean = false;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
}
