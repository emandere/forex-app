import { Action } from '@ngrx/store';
export enum LiveSessionActionTypes {
    SelectSessionForAnalysis = '[LiveSession] Select Session for Analysis'
}

export class SelectSessionForAnalysis implements Action{
    readonly type = LiveSessionActionTypes.SelectSessionForAnalysis
    constructor (public payload:string){}
  }
  
export type LiveSessionActions = SelectSessionForAnalysis 
