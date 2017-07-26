import { Pipe, PipeTransform } from '@angular/core';
import { Mistake } from './mistake';

@Pipe({
  name: 'verifiedMistake'
})

export class VerifiedMistakePipe implements PipeTransform {
  transform(allMistakes: Mistake[]): any {
    return allMistakes.filter(mistake => mistake.verified);
  }
}
