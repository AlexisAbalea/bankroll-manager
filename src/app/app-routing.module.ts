import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlerteComponent } from './alerte/alerte.component';
import { BankrollMenuComponent } from './bankroll-menu/bankroll-menu.component';
import { GamesComponent } from './games/games.component';
import { AuthGuardService } from './guards/auth.guard';
import { BankrollGuard } from './guards/bankroll.guard';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { ReportComponent } from './report/report.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'bm',
    component: SidebarComponent,
    canActivate: [ AuthGuardService],
    children: [
      { path: '', component: BankrollMenuComponent, pathMatch: 'full' },
      { path: 'bankroll', component: BankrollMenuComponent },
      { path: 'games', component: GamesComponent, pathMatch: 'full',  canActivate: [BankrollGuard] },
      { path: 'stats', component: StatistiquesComponent, canActivate: [BankrollGuard]  },
      { path: 'alerte', component: AlerteComponent, canActivate: [BankrollGuard]  },
      { path: 'profil', component: ProfilComponent },
      { path: 'report', component: ReportComponent },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
