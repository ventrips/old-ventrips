import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(categories: any, searchText: any): any {
    if (searchText == null) { return categories; }

    return categories.filter(function(category) {
      return category.CategoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }

}
