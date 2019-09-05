import {LiveSessionActions, LiveSessionActionTypes, SelectSessionForAnalysis} from '../actions/live-sessions.actions'
import { Session } from '../models/forex-session';
export interface State {
    liveSessionForAnalysis:Session
}

export const initialState: State = {
    liveSessionForAnalysis:null
}

export function reducer(state = initialState, action: LiveSessionActions): State {
    switch (action.type) {
      case LiveSessionActionTypes.SelectSessionForAnalysis:
        return handleSelectSessionForAnalysis(state,action);
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