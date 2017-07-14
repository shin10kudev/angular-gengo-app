export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  title: string;
  body: string;
  translation: string;
  progress: number;
  timeStamp: Date = new Date();
}
