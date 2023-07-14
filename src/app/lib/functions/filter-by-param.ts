import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FilterByParam {

  filterByParam(arr: object[], param: string, value: any): object[] {
    return arr.filter(obj => obj[param] === value);
  }

}
