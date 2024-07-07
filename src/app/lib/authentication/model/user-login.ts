import { Injectable } from '@angular/core';
import { Adapter } from '../../interfaces/adapter.interface';

export class UserLogin {
  email: string;
  password: string;
  instanceId: string;
  type: UserLoginType;
  token: string;
  organisationId: string;
  login: string;
  groups: any;

  constructor(email?: string, password?: string, instanceId?: string, type?: UserLoginType, token?: string, organisationId?: string,
              login?: string, groups?: any) {
    this.email = email;
    this.password = password;
    this.instanceId = instanceId;
    this.type = type;
    this.token = token;
    this.organisationId = organisationId;
    this.login = login;
    this.groups = groups;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserLoginAdapter implements Adapter<UserLogin> {

  adapt(item: any): UserLogin {

    return new UserLogin(
      item.email,
      item.password,
      item.instanceId,
      item.type,
      item.token,
      item.organisationId ,
      item.login,
      item.groups
    );
  }
}

enum UserLoginType {
  USER = 'USER', CUSTOMER = 'CUSTOMER', ANONYMOUS = 'ANONYMOUS',
}
