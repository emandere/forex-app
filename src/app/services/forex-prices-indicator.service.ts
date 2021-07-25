import { Injectable, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorResponse } from '../models/forex-prices-indicator';

@Injectable({
  providedIn: 'root'
})
export class ForexPricesIndicatorService {
  constructor(private http:HttpClient) { }
  hostname:string = window.location.hostname;

  getForexPricesIndicator(indicator:string):Observable<ForexPricesIndicatorResponse>{
    if(isDevMode()) {
      return this.http.get<ForexPricesIndicatorResponse>(`http://${window.location.hostname}:5002/api/forexpricesindicator/${indicator}`);
    } else {
      return this.http.get<ForexPricesIndicatorResponse>(`http://${window.location.hostname}/service/api/forexpricesindicator/${indicator}`);

    }
  }

  
 

}
