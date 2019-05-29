import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorResponse } from '../models/forex-prices-indicator';

@Injectable({
  providedIn: 'root'
})
export class ForexPricesIndicatorService {
  private hostname:string = "desktop-7cd2jf6";
  constructor(private http:HttpClient) { }
  
  getForexPricesIndicator():Observable<ForexPricesIndicatorResponse>{
    return this.http.get<ForexPricesIndicatorResponse>(`http://${this.hostname}:124/api/forexpricesindicator/BelowBollingerBandLower`);
  }

  
 

}
