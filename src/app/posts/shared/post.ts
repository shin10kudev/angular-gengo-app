export class Post {
  $key: string;
  title: string;
  body: string;
  translation: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  created_at: number = new Date().getTime();
  updated_at: number = new Date().getTime();
}
