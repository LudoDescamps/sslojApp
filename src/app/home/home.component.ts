import {Component, OnInit} from '@angular/core';
import {User, UserAdapter} from "../lib/models/User";
import {lastValueFrom, Subject} from "rxjs";
import {Instance} from "../lib/authentication/model/Instance";
import {AuthenticationService} from "../lib/authentication/authentication.service";
import {UserLoginAdapter} from "../lib/authentication/model/user-login";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {OAuth2Client} from "../lib/authentication/model/oauth2client";
import {DiscordService} from "../lib/services/discord.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    readonly discordOauth2Url = 'https://discord.com/oauth2/authorize?client_id=1147498267240841247&response_type=code&redirect_uri=https://ssloj.at-the-villa.com/home/&scope=identify+guilds+guilds.members.read';
    // readonly discordOauth2Url = 'https://discord.com/oauth2/authorize?client_id=1147498267240841247&response_type=code&redirect_uri=http://localhost:4200/home/&scope=identify+guilds+guilds.members.read';

    private currentUser: User;
  version = require('../../../package.json').version

  instance: Instance = undefined;

  error: string;

  logged: boolean = false;

  oAuth2Clients: OAuth2Client[];

  instanceId: string;
  darkMode: boolean;

  constructor(private authenticationService: AuthenticationService,
              private discordService: DiscordService,
              private loaderService: NgxUiLoaderService,
              private route: ActivatedRoute,
              private router: Router,
              private userAdapter: UserAdapter) {

    this.darkMode = window.localStorage.getItem('theme') && window.localStorage.getItem('theme') === 'dark';

    this.authenticationService.logout();
  }

    ngOnInit(): void {
    this.loaderService.start('getUserByGuild');

        this.authenticationService.getOAuth2Clients().subscribe(oauth2Clients => {
            this.oAuth2Clients = oauth2Clients;
        });

        // Code given by discord after authentication
        const code = this.route.snapshot.queryParamMap.get('code');
        console.log(code);
        lastValueFrom(this.discordService.getOAuth2Token(code)).then(discordToken => {
            console.log(discordToken);
            this.discordService.setToken(discordToken.access_token);

            // lastValueFrom(this.discordService.getUser(res['access_token'])).then(res1 => {
            //     console.log(res1);
            // }, err => {
            //     console.log(err);
            // })

            lastValueFrom(this.discordService.getUserGuilds(discordToken.access_token)).then(res1 => {
                console.log(res1);

            }, err => {
                console.log(err);
            })

            // Héphaistos member
            lastValueFrom(this.discordService.getUserByGuild(discordToken.access_token)).then(user => {
                console.log(user);
                // Check if he has at least one role from restricted roles
                if (user.hasRoles(this.discordService.hephaistos_restricted_role_ids)) {
                    console.log('USER HAS ROLE');
                    this.discordService.setUser(user);
                    this.router.navigate(['/knight']);
                } else {
                    // Don't have required role
                    console.log('ACCESS REJECTED');
                    this.discordService.resetUser();
                    this.discordService.resetToken();
                    this.router.navigate(['unauthorised'])
                }
                // if (user.roles.includes(this.discordService.hephaistos_discord_restricted_role_id)) {
                //     console.log('ACCESS GUARANTEED');
                //     this.discordService.setUser(user);
                //     this.router.navigate(['/knight']);
                // } else {
                //     // Don't have required role
                //     console.log('ACCESS REJECTED');
                //     this.discordService.resetUser();
                //     this.discordService.resetToken();
                //     this.router.navigate(['unauthorised'])
                // }
                this.loaderService.stop('getUserByGuild');

            }, err => {
                this.loaderService.stop('getUserByGuild');
                console.log('ACCESS REJECTED');
                this.discordService.resetUser();
                this.discordService.resetToken();
                this.router.navigate(['unauthorised'])
                console.log(err);
            })
        }, err => {
          this.loaderService.stop('getUserByGuild');
            console.log('ACCESS REJECTED');
            this.discordService.resetUser();
            this.discordService.resetToken();
            // Open discord login url
            window.open(this.discordOauth2Url,'_self');
            console.log(err);
        });
    }

  connectUser(): Subject<User> {

    const subject = new Subject<User>();
    this.loaderService.start('getUser');
    this.discordService.getUser('TODO_TOKEN').subscribe(user => {
      this.selectUser(user);
      this.loaderService.stop('getUser');

      this.error = undefined;
      subject.next(this.currentUser);
    },
        error => {
          console.log(error);

          this.loaderService.stop('getUser');
          subject.error(error);
        });

    return subject;
  }


  private selectUser(user: User, token?: string, organisationId?: string) {
    // const userLogin = this.userLoginAdapter.adapt(this.loginForm.value);
    this.currentUser = this.userAdapter.adapt(user);

    if (token !== undefined) {
      this.currentUser.token = token;
    }

    this.logged = true;
  }
}
