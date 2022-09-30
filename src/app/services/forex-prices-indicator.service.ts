import { Injectable, isDevMode, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForexPricesIndicatorResponse } from '../models/forex-prices-indicator';
import {AppService} from './appservice';

@Injectable({
  providedIn: 'root'
})
export class ForexPricesIndicatorService {
  constructor(private http:HttpClient, private appService:AppService) { }

  getForexPricesIndicator(indicator:string):Observable<ForexPricesIndicatorResponse>{
    let serviceName: string = this.appService.getAppServiceName();
    return this.http.get<ForexPricesIndicatorResponse>(`${serviceName}/api/forexpricesindicator/${indicator}`)
  }
}
