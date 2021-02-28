import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlerteComponent } from './alerte/alerte.component';
import { BankrollMenuComponent } from './bankroll-menu/bankroll-menu.component';
import { GamesComponent } from './games/games.component';
import { BankrollGuard } from './guards/bankroll-guard.guard';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: '', redirectTo: 'bm', pathMatch: 'full' },
  { path: 'bm',
    component: SidebarComponent,
    children: [
      { path: '', component: BankrollMenuComponent, pathMatch: 'full' },
      { path: 'bankroll', component: BankrollMenuComponent },
      { path: 'games', component: GamesComponent, pathMatch: 'full',  canActivate: [BankrollGuard] },
      { path: 'stats', component: StatistiquesComponent, canActivate: [BankrollGuard]  },
      { path: 'alerte', component: AlerteComponent, canActivate: [BankrollGuard]  },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
