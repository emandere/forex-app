import { Component, OnInit } from '@angular/core';
import {ForexPricesService} from '../services/forex-prices.service';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ForexPricesResponse } from '../models/forex-prices';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {

  test:Observable<ForexPricesResponse>;
  constructor(private forexPricesService:ForexPricesService) { }
  

  ngOnInit() {
    this.test = this.forexPricesService.getForexPrices()
  }

}
