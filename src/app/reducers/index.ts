import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLiveSessions from './live-session.reducer';
import { Session } from '../models/forex-session';
import { state } from '@angular/animations';


export interface State {
  liveSessions: fromLiveSessions.State;
}

export const reducers: ActionReducerMap<State> = {
  liveSessions:fromLiveSessions.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getLiveSessionForAnalysis = (state: State) => state.liveSessions.liveSessionForAnalysis;
export const getFilterSessionPair = (state: State) => state.liveSessions.filterSessionPair;
export const getFilteredSession = (state: State) => applyFilter(state.liveSessions.liveSessionForAnalysis,state.liveSessions.filterSessionPair);

function applyFilter(sess:Session,pair:string)
{
   return {...sess,ExperimentId:pair}
}