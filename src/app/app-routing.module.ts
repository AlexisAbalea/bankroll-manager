import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlerteComponent } from './alerte/alerte.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: '',
    component: SidebarComponent,
    children: [
      { path: 'games', component: GamesComponent },
      { path: 'stats', component: StatistiquesComponent },
      { path: 'alerte', component: AlerteComponent },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
