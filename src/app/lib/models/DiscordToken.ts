import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter.interface';

export class DiscordToken {
  token_type?: string;
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;

  constructor(token_type?: string, access_token?: string, expires_in?: number, refresh_token?: string, scope?: string) {
    this.token_type = token_type;
    this.access_token = access_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.scope = scope;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DiscordTokenAdapter implements Adapter<DiscordToken> {
  adapt(item: any): DiscordToken {
    return new DiscordToken(
      item.token_type,
      item.access_token,
      item.expires_in,
      item.refresh_token,
      item.scope
    );
  }
}
