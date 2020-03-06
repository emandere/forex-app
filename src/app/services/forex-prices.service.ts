import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexPricesResponse} from '../models/forex-prices';
@Injectable({
  providedIn: 'root'
})
export class ForexPricesService {

  constructor(private http:HttpClient) { }
  private hostname:string = "localhost";
  getForexPrices() {
    return this.http.get<ForexPricesResponse>(`http://${this.hostname}/service/api/forexprices`)
  }
}
