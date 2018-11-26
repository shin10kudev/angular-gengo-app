import * as firebase from "firebase";

export class Question {
  $key: string;
  topic: string;
  question_text: string;
  answer_text: string;
  additional_answer: string;
  notes: string;
  liked: boolean = false;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  timestamp: any = firebase.database.ServerValue.TIMESTAMP;
}
