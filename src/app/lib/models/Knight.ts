import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter.interface';

export class Knight {
    id: string;
    visible: boolean;
    name?: string;
    constellationName?: string; // Constellation
    element?: KnightElement; // Terre - Eau...
    knightClass?: string; // Attaque - Défense...
    artefacts: any[] = [];
    // artefacts: { id: string, recommended?: boolean, comments?: string[] }[] = [];
    arayas?: { id: string, recommended?: boolean, comments?: string[] }[];
    arayaInfos: string[];
    constellation?: any; // TODO
    // specialties?: any[]; // TODO ajouter la classe
    images?: string[] = []; // TODO ajouter la classe
    specificity?: Specificity; // Nom du groupe de chevaliers dans les illustrations
    advice?: string;
    mainTarget?: Target[]; // Cibles priviligiées
    neverUseAgainst?: Target[]; // Cibles à éviter
    recommendedConstellationLevel?: number;
    recommendedArmourLevel?: number;
    mainsStrength: []; // Points forts
    weakPoints: []; // Points faibles
    positions: []; // Position sur le terrain
    teams: { knights : [string[]], infos: string[] }; // Meilleurs teams
    otherInfos: []; // Autres infos - Divers

    modificationDate: Date;


    constructor(id?: string, visible?: boolean, name?: string, constellationName?: string, element?: KnightElement, knightClass?: string,
                artefacts?: any[], arayas?: { id: string; recommended?: boolean; comments?: string[] }[], arayaInfos?: string[],
                constellation?: any, images?: string[], specificity?: Specificity, advice?: string,
                mainTarget?: Target[], neverUseAgainst?: Target[], recommendedConstellationLevel?: number,
                recommendedArmourLevel?: number, mainsStrength?: [], weakPoints?: [], positions?: [],
                otherInfos?: [], teams?: { knights: [string[]], infos: string[] }, modificationDate?: Date) {
        this.id = id;
        this.visible = visible;
        this.name = name;
        this.constellationName = constellationName;
        this.element = element;
        this.knightClass = knightClass;
        this.artefacts = artefacts;
        this.arayas = arayas;
        this.arayaInfos = arayaInfos;
        this.constellation = constellation;
        this.images = images;
        this.specificity = specificity;
        this.advice = advice;
        this.mainTarget = mainTarget;
        this.neverUseAgainst = neverUseAgainst;
        this.recommendedConstellationLevel = recommendedConstellationLevel;
        this.recommendedArmourLevel = recommendedArmourLevel;
        this.mainsStrength = mainsStrength;
        this.weakPoints = weakPoints;
        this.positions = positions;
        this.otherInfos = otherInfos;
        this.teams = teams;
        this.modificationDate = modificationDate ;
    }
}

@Injectable({
    providedIn: 'root',
})
export class KnightAdapter implements Adapter<Knight> {
    adapt(item: any): Knight {
        const targetAdapter: TargetAdapter = new TargetAdapter;
        return new Knight(
            item.id,
            item.visible,
            item.name,
            item.constellationName,
            item.element,
            item.knightClass ? item.knightClass : '',
            item.artefacts ? item.artefacts : [],
            item.arayas,
            item.arayaInfos,
            item.constellation,
            item.images ? item.images : [],
            item.specificity,
            item.advice,
            item.mainTarget ? item.mainTarget.map(e => targetAdapter.adapt(e)) : undefined,
            item.neverUseAgainst ? item.neverUseAgainst.map(e => targetAdapter.adapt(e)) : undefined,
            item.recommendedConstellationLevel,
            item.recommendedArmourLevel,
            item.mainsStrength,
            item.weakPoints,
            item.positions,
            item.otherInfos,
            item.teams,
            item.modificationDate ? new Date(item.modificationDate) : new Date('2009-12-31T23:00:00.000Z'),
        );
    }
}

export class Target {
    knightId: string;
    comments: string[];

    constructor(knightId?: string, comments?: string[]) {
        this.knightId = knightId;
        this.comments = comments;
    }
}

@Injectable({
    providedIn: 'root',
})
export class TargetAdapter implements Adapter<Target> {
    adapt(item: any): Target {

        return new Target(
            item.knightId,
            item.comments ? item.comments : []
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
    DIEU = 'Dieu',
    CHEVALIERS_ARMURE_DIVINE = 'Les chevaliers en armure Divine',
    CHAMP_STELLAIRE = 'Chevalier du champ stellaire',
    SPECTRES = 'Spectres',
    MARINA = 'Marina',
    OR = 'Chevalier d\'or',
    ARGENT = 'Chevalier d\'argent',
    BRONZE = 'Chevalier de bronze'
}

export enum knightClass {
    ASSASSIN = 'Assassin',
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
