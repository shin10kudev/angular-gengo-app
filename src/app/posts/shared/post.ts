export class Post {
  $key: string;
  title: string;
  body: string;
  translation: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  timeStamp: Date = new Date();
}
