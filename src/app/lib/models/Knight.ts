import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter.interface';

export class Knight {
  name?: string;
  element?: string;
}

@Injectable({
  providedIn: 'root',
})
export class KnightAdapter implements Adapter<Knight> {
  adapt(item: any): Knight {
    return new Knight(
      item.id,
      item.value,
      item.date,
      item.type,
      item.organisationId,
      item.sellerId
    );
  }
}
