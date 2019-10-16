import { Injectable } from '@angular/core';
import { Actions, Effect,ofType } from '@ngrx/effects';
import { Observable} from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as myLiveSessionActions from '../actions/live-sessions.actions';
import { ForexSessionsService } from '../services/forex-sessions.service';


@Injectable()
export class LiveSessionsEffects {

  constructor(private actions$: Actions,private http:HttpClient,private forexSessionService:ForexSessionsService) {}
  @Effect()
  loadForexSession$: Observable<Action> = this.actions$.pipe(
    ofType(myLiveSessionActions.LiveSessionActionTypes.LoadLiveSession),
    map((action: myLiveSessionActions.LoadLiveSession) => action.payload),
    switchMap((payload) => {
      return this.forexSessionService.getForexSession(payload)
        .pipe(
          map((sessions)=>{
            return new myLiveSessionActions.SelectSessionForAnalysis(sessions.sessions[0]);
          })
        )
    })
  );
}
