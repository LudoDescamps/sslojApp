import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KnightSelectorComponent} from "./partials/knight-selector/knight-selector.component";

const routes: Routes = [
  {
    path: '',
    component: KnightSelectorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
