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
        HttpClientModule
    ],
  providers: [KnightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
