import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter.interface';

export class Image {
  url?: string;

  constructor(url?: string) {

    this.url = url;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ArtefactImageAdapter implements Adapter<Image> {
  adapt(item: any): Image {
    return new Image(
      item.url ? item.url : 'no-image.png'
    );
  }
}
