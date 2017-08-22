import * as firebase from 'firebase';

export class Translation {
  $key: string;
  ja: string;
  en: string;
  notes: string;
  verified: boolean = false;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
