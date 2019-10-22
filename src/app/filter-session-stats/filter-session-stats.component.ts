import { Component, OnInit, Input } from '@angular/core';
import { FilterSession } from '../models/forex-filter-session';

@Component({
  selector: 'app-filter-session-stats',
  templateUrl: './filter-session-stats.component.html',
  styleUrls: ['./filter-session-stats.component.css']
})
export class FilterSessionStatsComponent implements OnInit {
  @Input() filtersessionvalue:FilterSession;
  constructor() { }
  ngOnInit() {
  }

}
