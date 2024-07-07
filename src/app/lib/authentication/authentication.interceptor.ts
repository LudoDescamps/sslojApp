import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector, Provider } from '@angular/core';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from './authentication.service';
import {User} from "../models/User";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private injector: Injector,
              private loaderService: NgxUiLoaderService) {

    this.currentUser = new User();
    if (authenticationService.currentUser) {
      authenticationService.currentUser.subscribe((user: User) => {
        this.currentUser = user;
      });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = req;
    try {
      const organisation = this.currentUser?.['organisation'];
      let organisationId = req.headers && req.headers.has('OrganisationId') ? req.headers.get('OrganisationId') : '';
      if (organisationId === '' && organisation !== undefined && organisation !== null) {
        organisationId = organisation.id;
      }

      if (this.currentUser?.token &&
        req.url !== '/api/identity/authenticate' &&
        req.url !== '/api/instances' &&
        req.url !== '/api/instances/businessModules' &&
        req.url !== '/media/' &&
        req.url !== '/api/instances/detect' &&
        !req.url.match('/reset-password') &&
        !req.url.match('pstprnt') &&
        !req.url.match('i18n') &&
        req.url !== '/api/health') {

        // const languageService: LanguageService = this.injector.get(LanguageService);
        clonedRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.currentUser.token)
            .set('OrganisationId', organisationId)
            // .set('locale', languageService.currentLanguage)
            .set('ngsw-bypass', ''),
        });
      }

    } catch (ignored) {
      console.log(ignored);
    }
    // install an error handler
    return next.handle(clonedRequest).pipe(catchError((err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.loaderService.stop();
      } else {
        this.loaderService.stop();
        if (err.status === 401 && !req.url.match('/api/identity/authenticate') && !req.url.match('/password/') ) {
          this.router.navigate([ 'https://discord.com/api/oauth2/authorize?client_id=1147498267240841247&redirect_uri=https%3A%2F%2Fssloj.at-the-villa.com%2F&response_type=code&scope=identify%20guilds' ]);
          // this.router.navigate([ 'https://discord.com/oauth2/authorize?client_id=1147498267240841247&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fknight&scope=identify+guilds']);

          // this.router.navigate([ '/login' ]);
        }
        // Case of user trying to loggin with a disabled account
        if (err.status === 403 && err.error.error === 'DISABLED_USER' && !req.url.match('/api/orders')) {
          this.router.navigate([ '/login' ]);
        }
        if (err.status === 403 && err.error.error !== 'DISABLED_USER' && !req.url.match('/api/orders')) {
          this.router.navigate([ '/forbidden' ]);
        }
        if (err.status === 502 &&  !req.url.match('scheduler')) {
          this.router.navigate([ '/maintenance' ]);
        }
      }
      return throwError(err);
    }));
  }
}

export const AUTHENTICATION_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true,
};
