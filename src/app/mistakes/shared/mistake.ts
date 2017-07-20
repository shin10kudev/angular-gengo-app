export class Mistake {
  $key: string;
  content: string;
  correction: string;
  verified: boolean = false;
  count: number = 0;
  created_at: number = new Date().getTime()
  updated_at: number = new Date().getTime()
}
