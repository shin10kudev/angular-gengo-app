import * as firebase from "firebase";

export class Translation {
  $key: string;
  ja: string;
  en: string;
  furigana: string;
  notes: string;
  example_sentences: string;
  verified: boolean = false;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
