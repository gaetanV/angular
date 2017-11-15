import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'split',
})
export class PipeSplit implements PipeTransform {
   transform(data: string, arg: string): any {
      return data.split(arg);
  }
}
