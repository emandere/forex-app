import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../models/forex-session';
import { Store } from '@ngrx/store';
import * as liveSessionActions from '../actions/live-sessions.actions';
import * as fromState from '../reducers';



@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {
  @Input() sessionvalue:Session;
  constructor(private store: Store<fromState.State>) { }

  SetAnalysis() {
    
    this.store.dispatch(new liveSessionActions.SelectSessionForAnalysis(this.sessionvalue.Id)); 
     
  }

  ngOnInit() {
  }

}
