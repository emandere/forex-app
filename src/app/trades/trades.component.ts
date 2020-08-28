import { Component, OnInit } from '@angular/core';
import { Session } from '../models/forex-session';
import { Observable } from 'rxjs';
import { ForexSessionsService } from '../services/forex-sessions.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {
  liveSession$:Observable<Session>=null;
  constructor(private forexSessionService:ForexSessionsService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.liveSession$=this.forexSessionService.getForexSession(this.route.snapshot.params.id)
                                               .pipe(map(sessions => sessions.sessions[0]))
  }

}
