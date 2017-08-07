import * as firebase from 'firebase';

export class Feedback {
  $key: string;
  category: string;
  userEmail: string;
  subject: string;
  body: string;
  reply: string;
  status: string = 'Open';
  edited: boolean = false;
  resolved: boolean = false;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
}
