import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexPricesResponse} from '../models/forex-prices';
@Injectable({
  providedIn: 'root'
})
export class ForexPricesService {

  constructor(private http:HttpClient) { }
  getForexPrices() {
    return this.http.get<ForexPricesResponse>('http://localhost:124/api/forexprices')
  }
}
