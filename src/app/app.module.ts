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
import { MatButtonModule,MatTableModule, MatListModule, MatSelectModule } from "@angular/material";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


import { AppComponent } from './app.component';
import { LiveSessionsComponent } from './live-sessions/live-sessions.component';
import { LiveSessionComponent } from './live-session/live-session.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { SessionAnalysisComponent } from './session-analysis/session-analysis.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { LiveSessionAnalysisComponent } from './live-session-analysis/live-session-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveSessionsComponent,
    LiveSessionComponent,
    IndicatorsComponent,
    SessionAnalysisComponent,
    LiveSessionAnalysisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'indicators',component: IndicatorsComponent,pathMatch: 'full'},
      { path: 'session-analysis/:id',component: SessionAnalysisComponent},
      { path: '', component: LiveSessionsComponent,pathMatch: 'full' }
    ]),
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    Ng2GoogleChartsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
