import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(data: Array<Object>, searchTerm: string): any {
    if (_.isEmpty(searchTerm)) { return data; }
    return _.filter(data, (item: Object) => _.includes(_.toLower(item['name']), _.toLower(searchTerm)));
  }

}
