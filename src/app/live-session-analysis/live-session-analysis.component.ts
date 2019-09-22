import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../models/forex-session';

@Component({
  selector: 'app-live-session-analysis',
  templateUrl: './live-session-analysis.component.html',
  styleUrls: ['./live-session-analysis.component.css']
})
export class LiveSessionAnalysisComponent implements OnInit {
  @Input() sessionvalue:Session;
  constructor() { }

  ngOnInit() {
  }

}
