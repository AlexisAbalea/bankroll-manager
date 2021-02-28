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
import { HttpClientModule } from '@angular/common/http';
import { BankrollMenuComponent } from './bankroll-menu/bankroll-menu.component';
import { CardBankrollComponent } from './bankroll-menu/card-bankroll/card-bankroll.component';
import { ModalSuppressionComponent } from './modals/modal-suppression/modal-suppression.component';


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
    ModalSuppressionComponent
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
    HttpClientModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
