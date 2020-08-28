import { Component, OnInit, Input } from '@angular/core';
import { Trade } from '../models/forex-session';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  @Input() tradevalue:Trade;
  constructor() { }

  ngOnInit(): void {
  }

}
