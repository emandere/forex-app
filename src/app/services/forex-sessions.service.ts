import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexSessions, Session} from '../models/forex-session';

@Injectable({
  providedIn: 'root'
})
export class ForexSessionsService {
  private hostname:string = "desktop-7cd2jf6:124";
  constructor(private http:HttpClient) { }
  getForexSessions() {
    return this.http.get<ForexSessions>(`http://${this.hostname}/api/forexsession`)
  }

  getForexSession(id:string) {
    return this.http.get<ForexSessions>(`http://${this.hostname}/api/forexsession/${id}`)
  }
}
