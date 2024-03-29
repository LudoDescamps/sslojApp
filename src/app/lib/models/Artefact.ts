import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter.interface';
import {Image} from "./Image";

export class Artefact {
  id?: string;
  name?: string; // Nom de l'artefact
  level?: number;
  rank?: number;
  quality?: Quality;
  restriction?: any[];
  images?: Image[];

  constructor(id: string, name: string, level: number, rank: number, quality: Quality,
              restriction?: any[], images?: Image[]) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.rank = rank;
    this.quality = quality;
    this.restriction = restriction;
    this.images = images;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ArtefactAdapter implements Adapter<Artefact> {
  adapt(item: any): Artefact {
    return new Artefact(
      item.id,
      item.name,
      item.level,
      item.rank,
      item.quality,
      item.restriction,
      item.images ? item.images : []
    );
  }
}

export enum Quality {
  BLANC = 'Blanc',
  BLEU = 'Bleu',
  VIOLET = 'Violet',
  OR = 'Or',
  ROUGE = 'Rouge'
}


