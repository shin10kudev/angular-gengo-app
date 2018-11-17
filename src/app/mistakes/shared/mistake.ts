import * as firebase from "firebase";

export class Mistake {
  $key: string;
  title: string;
  content: string; // wrong japanese
  correction: string; // correct japanese
  notes: string;
  verified: boolean = false;
  errorCount: number = 1;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
}
