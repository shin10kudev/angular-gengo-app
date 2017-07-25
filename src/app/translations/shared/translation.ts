import * as firebase from 'firebase';

export class Translation {
  $key: string;
  ja: string;
  en: string;
  verified: boolean = false;
  notes: string;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
