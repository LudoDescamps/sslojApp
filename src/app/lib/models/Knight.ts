import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter.interface';

export class Knight {
  id: string;
  name?: string;
  constellationName?: string;
  element?: KnightElement;
  knightClass?: string;
  artefacts: any[] = [];
  // artefacts: { id: string, recommended?: boolean, comments?: string[] }[] = [];
  arayas?: { id: string, recommended?: boolean, comments?: string[] }[];
  constellation?: any; // TODO
  specialties?: any[]; // TODO ajouter la classe
  images?: string[] = []; // TODO ajouter la classe
  specificity?: Specificity;
  advice?: string;
  topAgainst?: Knight[];
  neverUseAgainst?: Knight[];
  minConstellationLevel?: number;
  minArmourLevel?: number;

  constructor(id?: string, name?: string, constellationName?: string, element?: KnightElement, knightClass?: string,
              artefacts: any[] = [],
              arayas?: { id: string, recommended?: boolean, comments?: string[] }[],
              constellation?: any, specialties?: any[], images?: string[], specificity?: Specificity, advice?: string,
              topAgainst?: Knight[], neverUseAgainst?: Knight[], minConstellationLevel?: number, minArmourLevel?: number) {
    this.id = id;
    this.name = name;
    this.constellationName = constellationName;
    this.element = element;
    this.knightClass = knightClass;
    this.artefacts = artefacts;
    this.arayas = arayas;
    this.constellation = constellation;
    this.specialties = specialties;
    this.images = images;
    this.specificity = specificity;
    this.advice = advice;
    this.topAgainst = topAgainst;
    this.neverUseAgainst = neverUseAgainst;
    this.minConstellationLevel = minConstellationLevel;
    this.minArmourLevel = minArmourLevel;
  }
}

@Injectable({
  providedIn: 'root',
})
export class KnightAdapter implements Adapter<Knight> {
  adapt(item: any): Knight {


    return new Knight(
      item.id,
      item.name,
      item.constellationName,
      item.element,
      item.knightClass ? item.knightClass : '',
      item.artefacts ? item.artefacts : [],
      item.arayas,
      item.constellation,
      item.specialties,
      item.images? item.images : [],
      item.specificity,
      item.advice,
      item.topAgainst,
      item.neverUseAgainst,
      item.minConstellationLevel,
      item.minArmourLevel,
    );
  }
}

export enum KnightClass {
  ASSASSIN = 'Assassin',
  COMPETENCE = 'Compétence',
  DEFENSIF = 'Défensif',
  OFFENSIF = 'Offensif',
  SOUTIEN = 'Soutien'
}

export enum KnightElement {
  AIR = 'Air',
  EAU = 'Eau',
  FEU = 'Feu',
  TERRE = 'Terre',
  LUMIERE = 'Lumière',
  OBSCURITE = 'Obscurité'
}

export enum Specificity {
  DIEU= 'Dieu',
  CHAMP_STELLAIRE = 'Chevalier du champ stellaire',
  SPECTRES = 'Spectres',
  MARINA = 'Marina',
  OR = 'Chevalier d\'or',
  ARGENT = 'Chevalier d\'argent',
  BRONZE = 'Chevalier de bronze'
}

export enum knightClass {
  ASSASSIN= 'Assassin',
  COMPETENCE = 'Compétence',
  DEFENSIF = 'Défensif',
  OFFENSIF = 'Offensif',
  SOUTIEN = 'Soutien'
}

export enum Specificity2 { // TODO rename
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
