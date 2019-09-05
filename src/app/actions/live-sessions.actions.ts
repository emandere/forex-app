import { Action } from '@ngrx/store';
import { Session } from '../models/forex-session';
export enum LiveSessionActionTypes {
    SelectSessionForAnalysis = '[LiveSession] Select Session for Analysis'
}

export class SelectSessionForAnalysis implements Action{
    readonly type = LiveSessionActionTypes.SelectSessionForAnalysis
    constructor (public payload:Session){}
  }
  
export type LiveSessionActions = SelectSessionForAnalysis 
