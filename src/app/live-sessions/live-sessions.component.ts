import { Component, OnInit } from '@angular/core';
import { ForexSessions, Session } from '../models/forex-session';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForexSessionsService } from '../services/forex-sessions.service';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {
  sessions$: Observable<Session[]>; 
  
  constructor(private forexSessionService:ForexSessionsService) { }
  

  ngOnInit() {
     this.sessions$ = this.forexSessionService.getForexSessions().pipe(
       map(sessions => sessions.sessions )
     );
  }

  

}
