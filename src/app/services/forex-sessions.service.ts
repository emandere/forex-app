import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexSessions, Session} from '../models/forex-session';

@Injectable({
  providedIn: 'root'
})
export class ForexSessionsService {
  hostname:string = window.location.hostname;

  constructor(private http:HttpClient) { }
  getForexSessions() {
    if(this.hostname == 'localhost'){
      return this.http.get<ForexSessions>(`http://${window.location.hostname}:5002/api/forexsession`);
    } else {
      return this.http.get<ForexSessions>(`http://${window.location.hostname}/service/api/forexsession`);
    }
  }

  getForexSession(id:string) {
    if(this.hostname != 'localhost'){
      return this.http.get<ForexSessions>(`http://${window.location.hostname}/service/api/forexsession/${id}`);
    } else {
      return this.http.get<ForexSessions>(`http://${window.location.hostname}:5002/api/forexsession/${id}`);
    }
  }
}
