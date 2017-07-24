import * as firebase from 'firebase';

export class Mistake {
  $key: string;
  content: string;
  correction: string;
  notes: string;
  verified: boolean = false;
  count: number = 0;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
