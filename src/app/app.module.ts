import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule} from "@angular/material/button";
import { MatListModule} from "@angular/material/list";
import { MatSelectModule} from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule}  from '@angular/material/dialog';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { SessionAnalysisComponent } from './session-analysis/session-analysis.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { LiveSessionAnalysisComponent } from './live-session-analysis/live-session-analysis.component';
import { FilterSessionInfoComponent } from './filter-session-info/filter-session-info.component';
import { FilterSessionStatsComponent } from './filter-session-stats/filter-session-stats.component';
import { TradeComponent } from './trade/trade.component';
import { TradesComponent } from './trades/trades.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveSessionsComponent,
    LiveSessionComponent,
    IndicatorsComponent,
    SessionAnalysisComponent,
    LiveSessionAnalysisComponent,
    FilterSessionInfoComponent,
    FilterSessionStatsComponent,
    TradeComponent,
    TradesComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '',component: IndicatorsComponent,pathMatch: 'full'},
      { path: 'session-analysis/:id',component: SessionAnalysisComponent},
      { path: 'trades/:id',component: TradesComponent},
      { path: 'sessions', component: LiveSessionsComponent,pathMatch: 'full' }
    ]),
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    Ng2GoogleChartsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  entryComponents: [FilterSessionInfoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
