export class Translation {
  $key: string;
  english: string;
  ja: string;
  verified: boolean = false;
  created_at: number = new Date().getTime()
  updated_at: number = new Date().getTime()
}
