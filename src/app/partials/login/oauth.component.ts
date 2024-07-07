import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {AuthenticationService} from "../../lib/authentication/authentication.service";

@Component({
  template: "<h1>OK</h1><p>{{token}}</p>",
})
export class OauthComponent implements OnInit {
  token: string;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
    // this.authenticationService.setToken(token);
  }
}
