import { Action } from '@ngrx/store';
import { Session } from '../models/forex-session';
export enum LiveSessionActionTypes {

    SelectSessionForAnalysis = '[LiveSession] Select Session for Analysis',
    FilterSessionByPair = '[LiveSession] Filter Session by Pair',
    LoadLiveSession ='[LiveSession] Load Live Session by Pair',
    SetLiveSession ='[LiveSession] Set Live Session by Pair'
}

export class SelectSessionForAnalysis implements Action{
    readonly type = LiveSessionActionTypes.SelectSessionForAnalysis
    constructor (public payload:Session){}
}

export class FilterSessionByPair implements Action{
    readonly type = LiveSessionActionTypes.FilterSessionByPair
    constructor (public payload:string){}
}
export class LoadLiveSession implements Action {
    readonly type = LiveSessionActionTypes.LoadLiveSession;
    constructor(public payload: string) {} 
  }


  
export type LiveSessionActions = SelectSessionForAnalysis 
                                 |  FilterSessionByPair
                                 |  LoadLiveSession 
                                
