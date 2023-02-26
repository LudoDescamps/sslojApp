import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter.interface';

export class Knight {
  name?: string;
  element?: string;
  specificity?: Specificity;
  advice?: string;
  topAgainst?: {[p: string]: {comment: string, placement: string, arayashiki: string[]}};
  neverUseAgainst?:{[p: string]: {comment: string}};

  constructor(name?: string, element?: string, specificity?: Specificity, advice?: string,
     topAgainst?: {[p: string]: {comment: string, placement: string, arayashiki: string[]}},
     neverUseAgainst?: {[p: string]: {comment: string}}) {

    this.name = name;
    this.element = element;
    this.specificity = specificity;
    this.advice = advice;
    this.topAgainst = topAgainst;
    this.neverUseAgainst = neverUseAgainst;
  }
}

@Injectable({
  providedIn: 'root',
})
export class KnightAdapter implements Adapter<Knight> {
  adapt(item: any): Knight {
    return new Knight(
      item.name,
      item.element,
      item.specificity,
      item.advice,
      item.topAgainst,
      item.neverUseAgainst
    );
  }
}

export enum Specificity {
  DEGAT = 'Dégâts',
  DEGAT_LONG_TERME = 'Dégâts à long terme',
  RAPIDITE_BOOST = 'Rapidité / Boost',
  CONTRE_RENVOI = 'Contre / Renvoi',
  CONTROLE_COSMOS = 'Contrôle du cosmos',
  STUN_SOAK = 'Stun / Soak',
  MORT = 'Mort',
  UNKNOW = 'Heuuu !'
}

export enum placement {
  DEVANT_FRONT = 'Placez votre personnage devant un ennemi en front.',
  SANS_IMPORTANCE = 'Placement sans importance.',
  SANS_IMPORTANCE_FRONT = 'Placement sans importance mais en FRONTLINE !',
  FACE = 'Placez votre personnage face à l\'ennemi.',
  MEME_COTE = 'Placez votre personnage du même côté que l\'ennemi.',
  SANS_IMPORTANCE_BACK = 'Placement sans importance mais en BACKLINE !'
}