import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import {DiscordService} from "../services/discord.service";


@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  readonly discordOauth2Url = 'https://discord.com/oauth2/authorize?client_id=1147498267240841247&response_type=code&redirect_uri=https://ssloj.at-the-villa.com/home/&scope=identify+guilds+guilds.members.read';
  // readonly discordOauth2Url = 'https://discord.com/oauth2/authorize?client_id=1147498267240841247&response_type=code&redirect_uri=http://localhost:4200/home/&scope=identify+guilds+guilds.members.read';

  private currentUser: any;

  constructor(private discordService: DiscordService) { }

  ngOnDestroy(): void {
    // this.schedulerWebsocketService.disconnectWebSocket();
  }

  canActivate() {

    if (this.discordService.currentUser && this.discordService._user && this.discordService._token) {
      return new Promise<boolean>((resolve, reject) => {
        // lastValueFrom(this.discordService.getUser(this.discordService._token)).then((user) => {
        //   console.log(user);
          resolve(true);
        // }, error1 => {
        //   reject(error1);
        // });
      });
    } else {
      // Open discord login url
    window.open(this.discordOauth2Url,'_self');
    }
  }
}

@Injectable()
export class AuthGuardGlobal implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate() {
    if (this.authenticationService._user && this.authenticationService.hasRoles(['ROLE_ADMIN'])) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
