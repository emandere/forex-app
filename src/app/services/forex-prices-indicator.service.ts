import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorResponse } from '../models/forex-prices-indicator';

@Injectable({
  providedIn: 'root'
})
export class ForexPricesIndicatorService {

  constructor(private http:HttpClient) { }

  getForexPricesIndicator():Observable<ForexPricesIndicatorResponse>{
    return this.http.get<ForexPricesIndicatorResponse>('http://192.168.1.101:124/api/forexpricesindicator/BelowBollingerBandLower');
  }

  
 

}
