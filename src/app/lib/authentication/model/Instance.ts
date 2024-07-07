import { Injectable } from '@angular/core';
import { Adapter } from '../../interfaces/adapter.interface';

export class Instance {
  id: string;
  name: string;
  nickname: string;
  instanceKey: string;
  demoMode: boolean;
  logoUrl: string;
  ticketLogoUrl: string;
  properties: any;
  passwordRegEx: string;

  constructor(id?: string, name?: string, nickname?: string, instanceKey?: string, demoMode?: boolean, logoUrl?: string, ticketLogoUrl?: string,
              properties?: any, passwordRegEx?: string) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.instanceKey = instanceKey;
    this.demoMode = demoMode;
    this.logoUrl = logoUrl;
    this.ticketLogoUrl = ticketLogoUrl;
    this.properties = properties;
    this.passwordRegEx = passwordRegEx;
  }
}

@Injectable({
  providedIn: 'root',
})
export class InstanceAdapter implements Adapter<Instance> {
  adapt(item: any): Instance {
    if (!item) {
      return undefined;
    }

    return new Instance(
      item.id,
      item.name,
      item.nickname,
      item.instanceKey,
      item.demoMode,
      item.logoUrl,
      item.ticketLogoUrl,
      item.properties,
      item.passwordRegEx
    );
  }
}
