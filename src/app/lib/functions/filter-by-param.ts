import { Injectable } from '@angular/core';
import {Knight} from "../models/Knight";

@Injectable({
  providedIn: 'root',
})

export class FilterByParam {

  filter(arr: Knight[], param: string, value: any): Knight[] {
    return arr.filter(obj => obj[param] === value);
  }

}
