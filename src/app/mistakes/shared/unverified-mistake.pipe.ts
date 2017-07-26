import { Pipe, PipeTransform } from '@angular/core';
import { Mistake } from './mistake';

@Pipe({
  name: 'unverifiedMistake'
})

export class UnverifiedMistakePipe implements PipeTransform {
  transform(allMistakes: Mistake[]): any {
    return allMistakes.filter(mistake => !mistake.verified);
  }
}
