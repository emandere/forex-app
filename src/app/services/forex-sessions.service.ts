import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ForexSessions, Session} from '../models/forex-session';
import {AppService} from './appservice';

@Injectable({
  providedIn: 'root'
})
export class ForexSessionsService {
  hostname:string = window.location.hostname;

  constructor(private http:HttpClient, private appService:AppService) { }
  getForexSessions() {
    let serviceName: string = this.appService.getAppServiceName();
    return this.http.get<ForexSessions>(`${serviceName}/api/forexsession/`)
  }

  getForexSession(id:string) {
    let serviceName: string = this.appService.getAppServiceName();
    return this.http.get<ForexSessions>(`${serviceName}/api/forexsession/${id}`)
  }
}
