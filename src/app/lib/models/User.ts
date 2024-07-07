import { Injectable } from '@angular/core';
import {Adapter} from "../interfaces/adapter.interface";

export class User {
  id: string;
  username: string;
  avatar: string;
  nick: string;
  roles: string[];

  token: string;

  constructor(id?: string, username?: string, avatar?: string, nick?: string, roles?: string[], token?: string) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.nick = nick;
    this.roles = roles;
    this.token = token;
  }

  /**
   * Returns true if user has role at least one in array parameter.
   * @param roles Roles to check.
   */
  public hasRoles(roles: string[]) {
    if (roles) {
      for (const role of roles) {
        if (this.roles && this.roles.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    console.log(item);
    return new User(
      item?.user?.id,
      item?.user?.username,
      item?.user?.avatar,
      item.nick,
      item.roles ? item.roles : [],
      item.token,
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserFromSessionStorageAdapter implements Adapter<User> {
  adapt(item: any): User {
    console.log(item);
    return new User(
        item?.id,
        item?.username,
        item?.avatar,
        item.nick,
        item.roles ? item.roles : [],
        item.token,
    );
  }
}


