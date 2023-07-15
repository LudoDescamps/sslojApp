import { Injectable } from '@angular/core';

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}
@Injectable({
  providedIn: 'root',
})

export class MultiCriteriaSort {
  multiCriteriaSort<T>(arr: T[], criteria: { criterion: (item: T) => any; order: SortOrder }[]) {
    return arr.sort((a: T, b: T) => {
      for (let criterion of criteria) {
        const aValue = criterion.criterion(a);
        const bValue = criterion.criterion(b);

        let result: number;
        if (aValue < bValue) {
          result = -1;
        } else if (aValue > bValue) {
          result = 1;
        } else {
          result = 0;
        }

        if (criterion.order === SortOrder.Descending) {
          result *= -1;
        }

        if (result !== 0) {
          return result;
        }
      }

      return 0;
    });
  }
}
