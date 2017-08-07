import * as firebase from 'firebase';

export class Mistake {
  $key: string;
  category: string = 'General Feedback';
  content: string;
  correction: string;
  errorCount: number = 1;
  notes: string;
  verified: boolean = false;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
}
