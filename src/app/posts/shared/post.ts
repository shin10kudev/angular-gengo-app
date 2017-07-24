import * as firebase from 'firebase';

export class Post {
  $key: string;
  title: string;
  body: string;
  translation: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  created_at: any = firebase.database.ServerValue.TIMESTAMP;
  updated_at: any = firebase.database.ServerValue.TIMESTAMP;
}
