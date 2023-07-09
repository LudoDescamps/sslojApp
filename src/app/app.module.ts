import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnightSelectorComponent } from './partials/knight-selector/knight-selector.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { KnightDetailsComponent } from './partials/knight-details/knight-details.component';
import { ClassAndElementComponent } from './partials/class-and-element/class-and-element.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {KnightService} from "./lib/services/knight.service";
import {HttpClientModule} from "@angular/common/http";
import { KnightAddUpdateComponent } from './partials/administration/knight-add-update/knight-add-update.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {MatInputModule} from "@angular/material/input";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

// Mat form fields appearance
const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

// Configure loader
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#9d9d9d',
  bgsOpacity: 0.5,
  bgsPosition: 'center-center',
  bgsSize: 100,
  bgsType: 'three-strings',
  blur: 3,
  fgsColor: '#A2BF1A',
  fgsPosition: 'center-center',
  fgsSize: 100,
  fgsType: 'three-strings',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(255,255,255,0.5)',
  pbColor: '#9d9d9d',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: '',
  textColor: '#9d9d9d',
  textPosition: 'center-center',
};
@NgModule({
  declarations: [
    AppComponent,
    KnightSelectorComponent,
    KnightDetailsComponent,
    ClassAndElementComponent,
    KnightAddUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    KnightService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
