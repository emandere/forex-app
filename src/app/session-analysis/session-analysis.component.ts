import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromState from '../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.css']
})
export class SessionAnalysisComponent implements OnInit {

  liveSessionId$:Observable<string>;
  constructor(private store: Store<fromState.State>) { }


  ngOnInit() {
    this.liveSessionId$ = this.store.select(fromState.getLiveSessionForAnalysis);
  }

}
