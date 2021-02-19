import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlerteComponent } from './alerte/alerte.component';
import { GamesComponent } from './games/games.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent},
  { path: 'stats', component: StatistiquesComponent},
  { path: 'alerte', component: AlerteComponent},
  { path: '**', component: GamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
