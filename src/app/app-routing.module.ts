import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: 'games', component: GamesComponent},
  { path: 'stats', component: StatistiquesComponent},
  { path: '**', component: GamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
