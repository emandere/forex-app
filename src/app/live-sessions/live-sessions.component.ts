import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorService } from '../services/forex-prices-indicator.service';
import { ForexPricesIndicatorResponse, Strategy } from '../models/forex-prices-indicator';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {

  prices$:Observable<ForexPricesIndicatorResponse>=null;
  displayedColumns: string[] = ['Instrument','Ask','Time','Indicator'];
  strategies: Strategy[] =[{value: "RSI"},{value: "BelowBollinger"}];
  constructor(private forexPricesIndicatorService:ForexPricesIndicatorService) { }
  

  ngOnInit() {
    this.prices$ = this.forexPricesIndicatorService.getForexPricesIndicator('BelowBollingerBandLower');
  }

  updateTable(strategy:string)
  {
    this.prices$ = this.forexPricesIndicatorService.getForexPricesIndicator(strategy);
  }

}
