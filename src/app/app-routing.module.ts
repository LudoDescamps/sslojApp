import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KnightSelectorComponent} from "./partials/knight-selector/knight-selector.component";
import {KnightAddUpdateComponent} from "./partials/administration/knight-add-update/knight-add-update.component";
import {ArayaAddUpdateComponent} from "./partials/administration/araya-add-update/araya-add-update.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/knight',
    pathMatch: 'full'
  },
  {
    path: 'knight',
    component: KnightSelectorComponent
  },
  {
    path: 'knight/:id',
    component: KnightSelectorComponent
  },
  {
    path: 'administration',
    component: KnightAddUpdateComponent
  },
  {
    path: 'araya',
    component: ArayaAddUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
