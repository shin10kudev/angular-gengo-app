export class Mistake {
  $key: string;
  mistaken_phrase: string;
  corrected_phrase: string;
  verified: boolean = false;
  created_at: number = new Date().getTime()
  updated_at: number = new Date().getTime()
}
