import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KnightSelectorComponent} from "./partials/knight-selector/knight-selector.component";
import {KnightAddUpdateComponent} from "./partials/administration/knight-add-update/knight-add-update.component";
import {ArayaAddUpdateComponent} from "./partials/administration/araya-add-update/araya-add-update.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./lib/guards/auth.guard";
import {UnauthorisedUSerComponent} from "./unauthorised-user/unauthorised-user.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthGuard],
    },
  {
    path: 'home/:code',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
    {
        path: 'knight',
        component: KnightSelectorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'knight/:id',
        component: KnightSelectorComponent,
        canActivate: [AuthGuard],
    },
  {
        path: 'knight/:code',
        component: KnightSelectorComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'administration',
        component: KnightAddUpdateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'araya',
        component: ArayaAddUpdateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'unauthorised',
        component: UnauthorisedUSerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
