import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutLongTitle'
})
export class CutLongTitlePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if(value.length>30)
    {
        value = value.substring(0,30) + '\n' + value.substring(30,value.length) ;
        console.log(value)
    }
    return value;
  }

}
