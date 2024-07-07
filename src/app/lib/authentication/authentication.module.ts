import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [],
  exports: [],
  providers: [ AuthenticationService ],
})
export class AuthenticationModule {
}
