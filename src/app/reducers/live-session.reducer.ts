import {LiveSessionActions, LiveSessionActionTypes, SelectSessionForAnalysis} from '../actions/live-sessions.actions'
export interface State {
    liveSessionForAnalysis:string
}

export const initialState: State = {
    liveSessionForAnalysis:"ddd"
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