import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterKnightComponent } from './pages/counter-knight/counter-knight.component';

const routes: Routes = [
  {
    path: '',
    component: CounterKnightComponent
  },
  {
    path: 'counters',
    component: CounterKnightComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
