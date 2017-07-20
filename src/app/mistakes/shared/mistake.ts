export class Mistake {
  $key: string;
  content: string;
  correction: string;
  verified: boolean = false;
  created_at: number = new Date().getTime()
  updated_at: number = new Date().getTime()
}
