import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexSessions} from '../models/forex-session';

@Injectable({
  providedIn: 'root'
})
export class ForexSessionsService {

  constructor(private http:HttpClient) { }
  getForexSessions() {
    return this.http.get<ForexSessions>('http://localhost:124/api/forexsession')
  }
}
