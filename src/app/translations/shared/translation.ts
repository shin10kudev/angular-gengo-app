import * as firebase from "firebase";

export class Translation {
  $key: string;
  ja: string;
  en: string;
  furigana: string;
  notes: string;
  category: string = "General";
  example_sentences: string;
  liked: boolean = false;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
