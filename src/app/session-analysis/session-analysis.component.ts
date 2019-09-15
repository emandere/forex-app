import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Observable, of } from 'rxjs';
import * as fromState from '../reducers';
import { Session, Trade } from '../models/forex-session';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ForexSessionsService } from '../services/forex-sessions.service';




@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.css']
})
export class SessionAnalysisComponent implements OnInit {

  liveSession$:Observable<Session>;
  liveSession:Session;
  public plHistGoogleChart:     GoogleChartInterface = null;
  public lengthHistGoogleChart:     GoogleChartInterface = null;
  public pLByPairHistogramChart:     GoogleChartInterface = null;
  public balanceHistoryChart:     GoogleChartInterface = null;
  public countPLByPairChart:     GoogleChartInterface = null;
  constructor(private store: Store<fromState.State>,
              private route: ActivatedRoute,
              private forexSessionService:ForexSessionsService) { }


  ngOnInit() {
    
    this.liveSession$ = this.store.select(fromState.getLiveSessionForAnalysis);
    this.liveSession$
        .pipe(
          switchMap(session =>{
            if(session==null){
                return this.forexSessionService.getForexSession(this.route.snapshot.params.id)
                                               .pipe(map(sessions => sessions.sessions[0]))
            } else {
                return of(session);
            }
          })
        ).subscribe(
          sess=>{
                this.liveSession = sess;
                this.setupCharts(sess);
          }
        )
    
  }

  dateDiff(trade:Trade):number
  {
    let openDate:Date = new Date(trade.OpenDate);
    let closeDate:Date = new Date(trade.CloseDate);

    let diff:number = Math.abs(openDate.getTime() - closeDate.getTime());
    let diffDays:number = Math.ceil(diff / (1000 * 3600 * 24));         

    return diffDays;

  }

  sumPL(pair:string,trades:Trade[]):number
  {
      return trades.filter(trade=>trade.Pair==pair)
                    .map(trade=>trade.PL)
                    .reduce((acc,pl)=>acc+pl);
  }

  countPL(pair:string,trades:Trade[]):number
  {
      return trades.filter(trade=>trade.Pair==pair)
                   .length;                  
  }

  uniquePairs(trades:Trade[]):string[]
  {
     let setvalues = new Set(trades.map(trade=>trade.Pair)).values();
     return Array.from(setvalues);
  }
  
  setupCharts(sessionInfo:Session) {
    let dataPL:Array<Array<any>>=null;
    let dataTradeLength:Array<Array<any>>=null;
    let dataPLByPair:Array<Array<any>>=null;
    let dataBalanceHistory:Array<Array<any>>=null;
    let dataCountByPair:Array<Array<any>>=null;

    dataPL = sessionInfo
                    .SessionUser
                    .Accounts
                    .Primary
                    .ClosedTrades
                    .map((trade)=>[trade.Pair+trade.OpenDate,trade.PL]);
                    
    dataPL.unshift(["Trade","PL"]);
                

    this.plHistGoogleChart=
    {
      chartType:  "Histogram",
      dataTable:  dataPL,
      options: 
      {
        title:  "Histogram of PL for closed trades",
        legend: { position: 'none' },
        hAxis:  {  title:"PL (Dollars)"},
        vAxis:  { title:"Number of trades"},
        height: 400
      }
    };
    

    dataTradeLength = sessionInfo
                    .SessionUser
                    .Accounts
                    .Primary
                    .ClosedTrades
                    .map((trade)=>[trade.Pair+trade.OpenDate,this.dateDiff(trade)]);
    dataTradeLength.unshift(["Trade","Days"]);

    this.lengthHistGoogleChart=
    {
      chartType:  "Histogram",
      dataTable:  dataTradeLength,
      options: 
      {
        title:  "Duration of trades",
        legend: { position: 'none' },
        hAxis:  {  title:"Number of Trades"},
        vAxis:  { title:"Duration (days)"},
        height: 400
      }
    };

    let closedTrades =sessionInfo
                      .SessionUser
                      .Accounts
                      .Primary
                      .ClosedTrades;

    dataPLByPair = this.uniquePairs(closedTrades)
                    .map((pair)=>[pair,this.sumPL(pair,closedTrades)]);

    dataPLByPair.unshift(["Pair","PL"]);

    this.pLByPairHistogramChart=
    {
      chartType:  "Bar",
      dataTable:  dataPLByPair,
      options: 
      {
        chart: 
        {
          title:  "PL vs Pair",
          legend: { position: 'none' },
        },
        bars: 'horizontal',
        height: 400
      }
    };

    dataBalanceHistory = sessionInfo
                      .SessionUser
                      .Accounts
                      .Primary
                      .BalanceHistory
                      .map((balance)=>[new Date(balance.Date),balance.Amount]);

    dataBalanceHistory.unshift(["Date","Balance"]);
    this.balanceHistoryChart =
    {
      chartType:'Line',
      dataTable:dataBalanceHistory,
      
      options : {
        chart:
        {
          title: "Balance History",
          legend: { position: 'none' }
        },
        hAxis:
        {
          title:"Date"
        }, 
        series: 
        {
          1: {curveType: 'function'}
        },
        vAxis:
        {
          title:"Balance"
        },
        height: 400
      }
    }

    dataCountByPair = this.uniquePairs(closedTrades)
                    .map((pair)=>[pair,this.countPL(pair,closedTrades)]);
    dataCountByPair.unshift(["Pair","Count"]);                
    this.countPLByPairChart=
    {
      chartType:  "Bar",
      dataTable:  dataCountByPair,
      options: 
      {
        chart: 
        {
          title:  "Trades by Pair",
          legend: { position: 'none' },
        },
        bars: 'horizontal',
        height: 400
      }
    };
                
  }

}
