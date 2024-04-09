import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classdisplay'
})
export class ClassDisplayPipe implements PipeTransform {

  private romanNumbersMap: Map<number, string> = new Map<number, string>([
    [1, 'I', ],
    [2, 'II', ],
    [3, 'III', ],
    [4, 'IV', ],
    [5, 'V', ],
    [6, 'VI', ],
    [7, 'VII', ],
    [8, 'VIII', ],
    [9, 'IX', ],
    [10, 'X', ],
    [11, 'XI', ],
    [12, 'XII', ],
    [13, 'XIII', ]
  ]);


  transform(grade: number, label: string): string {
    let name:string = this.romanNumbersMap.get(grade) ? this.romanNumbersMap.get(grade)! : 'INVALID';

    return label? name+ '-' + label : name;
  }

}
