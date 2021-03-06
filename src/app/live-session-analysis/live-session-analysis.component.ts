import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../models/forex-session';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FilterSessionInfoComponent } from '../filter-session-info/filter-session-info.component';
import * as fromState from '../reducers';
import { Store } from '@ngrx/store';
import * as liveSessionActions from '../actions/live-sessions.actions';


@Component({
  selector: 'app-live-session-analysis',
  templateUrl: './live-session-analysis.component.html',
  styleUrls: ['./live-session-analysis.component.css']
})
export class LiveSessionAnalysisComponent implements OnInit {
  @Input() sessionvalue:Session;
  filterPair:string;
  constructor(public dialog: MatDialog,
              private store: Store<fromState.State>,) { }

  ngOnInit() {
  }

  FilterAnalysis() {
    const dialogRef = this.dialog.open(FilterSessionInfoComponent, {
      width: '250px',
      data: {pair: this.filterPair}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
      this.store.dispatch(new liveSessionActions.FilterSessionByPair(result));
     
    });
  }


}
