import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { GraphiqueLineaireComponent } from './statistiques/graphique-lineaire/graphique-lineaire.component';
import { ChiffresCleComponent } from './statistiques/chiffres-cle/chiffres-cle.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AjoutTransactionDialog } from './modals/modal-transaction/ajout-transaction.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AlerteComponent } from './alerte/alerte.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BankrollMenuComponent } from './bankroll-menu/bankroll-menu.component';
import { CardBankrollComponent } from './bankroll-menu/card-bankroll/card-bankroll.component';
import { ModalSuppressionComponent } from './modals/modal-suppression/modal-suppression.component';
import { ModalParameterBankrollComponent } from './modals/modal-parameter-bankroll/modal-parameter-bankroll.component';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { BankrollService } from './services/bankroll.service';
import { AuthService } from './services/auth.service';
import { NgoloKanteInterceptor } from './services/ngolokante.interceptor';
import { ProfilComponent } from './profil/profil.component';
import { ReportComponent } from './report/report.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { CustomLinerChartService } from './services/custom-liner-chart.service';
import { GraphiqueAreaComponent } from './statistiques/graphique-area/graphique-area.component';
import { ModalModifierGameComponent } from './modals/modal-modifier-game/modal-modifier-game.component';
import {MatPaginatorModule} from '@angular/material/paginator';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    StatistiquesComponent,
    HeaderComponent,
    GraphiqueLineaireComponent,
    ChiffresCleComponent,
    AjoutTransactionDialog,
    AlerteComponent,
    LoginComponent,
    SidebarComponent,
    BankrollMenuComponent,
    CardBankrollComponent,
    ModalSuppressionComponent,
    ModalParameterBankrollComponent,
    ProfilComponent,
    ReportComponent,
    SnackbarComponent,
    GraphiqueAreaComponent,
    ModalModifierGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgxChartsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter}}),
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [
    MatDatepickerModule,
    //JwtHelperService,
    AuthService,
    BankrollService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgoloKanteInterceptor,
      multi: true
    },
    CustomLinerChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
