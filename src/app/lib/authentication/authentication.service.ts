import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OAuth2Client } from './model/oauth2client';
import { UserLogin } from './model/user-login';
import {User, UserAdapter} from "../models/User";

@Injectable({
  providedIn:'root'
})
export class AuthenticationService {
  public _user: User;
  public currentUser: Subject<User>;

  constructor(private http: HttpClient,
              private userAdapter: UserAdapter) {
    this.currentUser = new BehaviorSubject<User>(undefined);

    if (sessionStorage.getItem('currentUser')) {
      this.currentUser = new BehaviorSubject<User>(this.userAdapter.adapt(JSON.parse(sessionStorage.getItem('currentUser'))));
    } else {
      this.currentUser = new BehaviorSubject<User>(undefined);
    }

    this.currentUser.subscribe(user => {
      this._user = user;
    });
  }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this.http.post<User>('/api/identity/authenticate', userLogin)
      .pipe(map(item => this.userAdapter.adapt(item)));
  }


  getCurrentUser(token?: string): Observable<User> {
    let headers = new HttpHeaders();
    if (token !== undefined) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return this.http.get<User>('/api/identity/me', {headers})
      .pipe(map(item => this.userAdapter.adapt(item)));
  }

  logout(): void {
    this._user = undefined;
    this.currentUser.next(undefined);
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('instance');
  }

  setUser(user: User) {
    this._user = user;
    sessionStorage.setItem('currentUser', JSON.stringify(this._user));
    this.currentUser.next(user);
  }

  hasRoles(roles: string[]) {
    const groups = this._user.roles;
    if (roles === undefined || groups.includes('ROLE_ADMIN')) {
      return true;
    } else if (roles) {
      for (const role of roles) {
        if (groups.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }

  regenerateToken(): Observable<UserLogin> {
    return this.http.post<UserLogin>('/api/identity/authenticate', {
      email: this._user['email'],
      token: this._user.token,
      instanceId: this._user['instanceId'],
    });
  }

  regenerateTokenPromise() {
    const promise = new Promise((resolve, reject) => {
      const helper = new JwtHelperService();
      const expirationDate = helper.getTokenExpirationDate(this._user.token);
      if (expirationDate >= new Date(moment(new Date(expirationDate)).subtract({hours: 2}).format())) {
        this.regenerateToken().subscribe(data => {
          if (!this._user) {
            this._user = this.userAdapter.adapt(data);
          }
          this._user.token = data['token'];
          this.currentUser.next(this._user);
          resolve(data);
        });
      } else {
        resolve(this._user);
      }
    });
    return promise;
  }

  getOAuth2Clients(): Observable<OAuth2Client[]> {
    return this.http.get<OAuth2Client[]>('/api/oauth2/clients');
  }

  getUserToken(): string {
    if (this._user.token) {
      return this._user.token;
    } else {
      return undefined;
    }
  }
}
