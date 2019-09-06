import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Observable } from 'rxjs';
import * as fromState from '../reducers';
import { Session, Trade } from '../models/forex-session';



@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.css']
})
export class SessionAnalysisComponent implements OnInit {

  liveSession$:Observable<Session>;
  public lengthHistGoogleChart:     GoogleChartInterface = null;
  public pLByPairHistogramChart:     GoogleChartInterface = null;
  public balanceHistoryChart:     GoogleChartInterface = null;
  constructor(private store: Store<fromState.State>) { }


  ngOnInit() {
    this.liveSession$ = this.store.select(fromState.getLiveSessionForAnalysis);
    this.liveSession$.subscribe(
      sess=>{
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

  uniquePairs(trades:Trade[]):string[]
  {
     let setvalues = new Set(trades.map(trade=>trade.Pair)).values();
     return Array.from(setvalues);
  }
  
  setupCharts(sessionInfo:Session) {
    let dataTradeLength:Array<Array<any>>=null;
    let dataPLByPair:Array<Array<any>>=null;
    let dataBalanceHistory:Array<Array<any>>=null;

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
                      .map((balance)=>[balance.Date,balance.Amount]);

    dataBalanceHistory.unshift(["Date","Balance"]);
    this.balanceHistoryChart =
    {
      chartType:'LineChart',
      dataTable:dataBalanceHistory,
      
      options : {
        title: "Balance History",
        legend: { position: 'none' },
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


  }

}
