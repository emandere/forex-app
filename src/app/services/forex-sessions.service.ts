import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexSessions, Session} from '../models/forex-session';

@Injectable({
  providedIn: 'root'
})
export class ForexSessionsService {
  
  constructor(private http:HttpClient) { }
  getForexSessions() {
    return this.http.get<ForexSessions>(`http://${window.location.hostname}/service/api/forexsession`)
  }

  getForexSession(id:string) {
    return this.http.get<ForexSessions>(`http://${window.location.hostname}/service/api/forexsession/${id}`)
  }
}
