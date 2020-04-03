import { Component, OnInit } from '@angular/core';
import { interval,Observable } from 'rxjs';
import { ForexPricesIndicatorService } from '../services/forex-prices-indicator.service';
import { ForexPricesIndicatorResponse, Strategy } from '../models/forex-prices-indicator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {
  prices$:Observable<ForexPricesIndicatorResponse>=null;
  displayedColumns: string[] = ['Instrument','Ask','Time','Indicator'];
  strategies: Strategy[] =[{value: "RSI"},{value: "BelowBollinger"}];
  constructor(private forexPricesIndicatorService:ForexPricesIndicatorService) { }
  strategy:string = "RSI";

  ngOnInit() {
    this.setPrices();
    interval(30000).pipe(
      map(t=>this.setPrices()))
    .subscribe()
    
    
  }

  updateTable(selectedStrategy:string)
  {
     this.strategy = selectedStrategy;
     this.setPrices();
    //this.prices$ = this.forexPricesIndicatorService.getForexPricesIndicator(strategy);
  }

  setPrices()
  {
    this.prices$ = this.forexPricesIndicatorService.getForexPricesIndicator(this.strategy);
  }

}
