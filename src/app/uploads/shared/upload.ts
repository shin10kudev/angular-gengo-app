export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  title: string;
  body: string;
  translation: string;
  progress: number;
  createdAt: Date = new Date();
}
