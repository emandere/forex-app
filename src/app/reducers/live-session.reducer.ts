import {LiveSessionActions, LiveSessionActionTypes, SelectSessionForAnalysis, FilterSessionByPair} from '../actions/live-sessions.actions'
import { Session } from '../models/forex-session';
export interface State {
    liveSessionForAnalysis:Session;
    filterSessionPair:string;
}

export const initialState: State = {
    liveSessionForAnalysis:null,
    filterSessionPair:'ALL'
}

export function reducer(state = initialState, action: LiveSessionActions): State {
    switch (action.type) {
      case LiveSessionActionTypes.SelectSessionForAnalysis:
        return handleSelectSessionForAnalysis(state,action);
      case LiveSessionActionTypes.FilterSessionByPair:
        return handleFilterSessionByPair(state,action)
      default:
        return state;
    }
}

function handleSelectSessionForAnalysis(state: State, action:SelectSessionForAnalysis ): State {
    return {
      ...state,
      liveSessionForAnalysis: action.payload
    };
}

function handleFilterSessionByPair(state: State, action:FilterSessionByPair ): State {
  return {
    ...state,
    filterSessionPair: action.payload
  };
}

