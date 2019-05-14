import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorService } from '../services/forex-prices-indicator.service';
import { ForexPricesIndicatorResponse } from '../models/forex-prices-indicator';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {

  prices$:Observable<ForexPricesIndicatorResponse>=null;
  displayedColumns: string[] = ['Instrument','Bid','Time','Indicator'];
  constructor(private forexPricesIndicatorService:ForexPricesIndicatorService) { }
  

  ngOnInit() {
    this.prices$ = this.forexPricesIndicatorService.getForexPricesIndicator()
  }

}
