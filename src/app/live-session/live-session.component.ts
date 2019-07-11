import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../models/forex-session';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent implements OnInit {
  @Input() sessionvalue:Session;
  constructor() { }

  ngOnInit() {
  }

}
