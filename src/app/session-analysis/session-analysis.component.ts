import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Observable, of } from 'rxjs';
import * as fromState from '../reducers';
import { Session, Trade, BalanceHistory } from '../models/forex-session';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, flatMap, take } from 'rxjs/operators';
import { ForexSessionsService } from '../services/forex-sessions.service';
import * as liveSessionActions from '../actions/live-sessions.actions';
import { FilterSession } from '../models/forex-filter-session';




@Component({
  selector: 'app-session-analysis',
  templateUrl: './session-analysis.component.html',
  styleUrls: ['./session-analysis.component.css']
})
export class SessionAnalysisComponent implements OnInit {

  liveSession$:Observable<Session>;
  pair$:Observable<string>;
  liveSession:Session;
  filterByPair:boolean=false;
  filtersessionvalue:FilterSession;
  public plHistGoogleChart:     GoogleChartInterface = null;
  public lengthHistGoogleChart:     GoogleChartInterface = null;
  public pLByPairHistogramChart:     GoogleChartInterface = null;
  public balanceHistoryChart:     GoogleChartInterface = null;
  public countPLByPairChart:     GoogleChartInterface = null;
  constructor(private store: Store<fromState.State>,
              private route: ActivatedRoute,
              private forexSessionService:ForexSessionsService) { }


  ngOnInit() {

    this.pair$ = this.store.select(fromState.getFilterSessionPair);
    this.liveSession$ = this.store.select(fromState.getLiveSessionForAnalysis);
    this.liveSession$
        .pipe(
          switchMap(session =>{
            if(session==null){
                this.store.dispatch(new liveSessionActions.LoadLiveSession(this.route.snapshot.params.id));
                return this.forexSessionService.getForexSession(this.route.snapshot.params.id)
                                               .pipe(map(sessions => sessions.sessions[0]))

            } 
            return this.store.select(fromState.getLiveSessionForAnalysis);
          })
        )
        .subscribe(
          sess=>{
                
                this.liveSession = sess;
                console.log(sess.ExperimentId)
                this.pair$.subscribe(
                  pair=>{
                      if(pair=='ALL')
                        this.filterByPair=false;
                      else
                        this.filterByPair=true;
                      this.setupCharts(sess,pair);
                      this.setupFilterStats(sess,pair);
                    })
          }
        )
    
  }

  setupFilterStats(sess:Session,pair:string)
  {
    let closedTrades:Trade[] = sess
                          .SessionUser
                          .Accounts
                          .Primary
                          .ClosedTrades
                          .filter(x=>x.Pair==pair);

    let openTrades:Trade[] = sess
                          .SessionUser
                          .Accounts
                          .Primary
                          .Trades
                          .filter(x=>x.Pair==pair);                   
    
    
    let balanceHistoryDates =  sess
                          .SessionUser
                          .Accounts
                          .Primary
                          .BalanceHistory
                          .map((balance)=>balance.Date)

    let setDates:Set<string> = new Set<string>(balanceHistoryDates); 
    let setClosedDates:Set<string> = new Set<string>(closedTrades.map(x=>new Date(x.CloseDate).toISOString().split('T')[0])); 
    let sortedDates:string[] = Array.from(setDates).sort();
    let balanceHistoryFilter:any[][] = [];
    let pairAmount:number = sess.SessionUser
                                      .Accounts
                                      .Primary
                                      .BalanceHistory[0]
                                      .Amount;

    for(let date of sortedDates) {
        if(setClosedDates.has(date))
        {
          pairAmount+= closedTrades.filter(x=>x.CloseDate.split('T')[0]==date).map(x=>x.PL).reduce((t,e)=>t+e,0);
        }
        
        balanceHistoryFilter.push([new Date(date),pairAmount]);;
    }

    let profitableOpenTrades = openTrades.filter(x => x.PL > 0).length;
    let profitableClosedTrades = closedTrades.filter(x => x.PL > 0).length;
    
    let percentOpenProfitable:number = openTrades.length==0?0:(profitableOpenTrades/openTrades.length)*100.0;
    let percentClosedProfitable:number = closedTrades.length==0?0:(profitableClosedTrades/closedTrades.length)*100.0

    this.filtersessionvalue ={
      Id: sess.Id,
      FilterPair: pair,
      StartDate: sess.StartDate,
      CurrentTime: sess.CurrentTime,
      RealizedPL:sess.RealizedPL,
      OpenTrades:openTrades.length,
      PercentProfitableOpen:percentOpenProfitable.toFixed(2),
      ClosedTrades:closedTrades.length,
      PercentProfitableClosed:percentClosedProfitable.toFixed(2),
      Balance: balanceHistoryFilter[balanceHistoryFilter.length-1][1].toFixed(2)
    }
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

  setupCharts(sessionInfo:Session,pair:string){
    
    if(pair=='ALL') {
        this.setupChartsNoFilter(sessionInfo);
    } else {
        this.setupChartsFilter(sessionInfo,pair);
    }
    

  }

  
  

  setupChartsNoFilter(sessionInfo:Session) {
    let dataPLByPair:Array<Array<any>>=null;
    let dataCountByPair:Array<Array<any>>=null;
    let trades:Trade[] = sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .ClosedTrades;
    let balanceHistory =  sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .BalanceHistory
                          .map((balance)=>[new Date(balance.Date),balance.Amount]);

    this.createSharedTradeCharts(trades);
    this.createBalanceHistoryChart(balanceHistory);
    dataPLByPair = this.uniquePairs(trades)
                    .map((pair)=>[pair,this.sumPL(pair,trades)]);

    dataPLByPair.unshift(["Pair","PL"]);

    this.pLByPairHistogramChart=
    {
      chartType:  "Bar",
      dataTable:  dataPLByPair,
      options: 
      {
        chart: { title:  "PL vs Pair", legend: { position: 'none' }},
        bars: 'horizontal',
        height: 400
      }
    };

    
    dataCountByPair = this.uniquePairs(trades)
                    .map((pair)=>[pair,this.countPL(pair,trades)]);
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

  setupChartsFilter(sessionInfo:Session,pair:string) {
    this.pLByPairHistogramChart = null;
    this.countPLByPairChart = null;
    let trades:Trade[] = sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .ClosedTrades
                          .filter(x=>x.Pair==pair);

                       
    let balanceHistory =  sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .BalanceHistory;
                          //.map((balance)=>[new Date(balance.Date),balance.Amount]);
    
    let balanceHistoryDates =  sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .BalanceHistory
                          .map((balance)=>balance.Date)

    let setDates:Set<string> = new Set<string>(balanceHistoryDates); 
    let setClosedDates:Set<string> = new Set<string>(trades.map(x=>new Date(x.CloseDate).toISOString().split('T')[0])); 
    let sortedDates:string[] = Array.from(setDates).sort();
    let balanceHistoryFilter:any[][] = [];
    let pairAmount:number = sessionInfo.SessionUser
                                      .Accounts
                                      .Primary
                                      .BalanceHistory[0]
                                      .Amount;
   

    for(let date of sortedDates)
    {
        if(setClosedDates.has(date))
        {
          pairAmount+= trades.filter(x=>x.CloseDate.split('T')[0]==date).map(x=>x.PL).reduce((t,e)=>t+e,0);
        }
        
        balanceHistoryFilter.push([new Date(date),pairAmount]);;
    }

    this.createSharedTradeCharts(trades);
    this.createBalanceHistoryChart(balanceHistoryFilter);

  }

  createSharedTradeCharts(trades:Trade[]) {
    let dataPL:Array<Array<any>>=null;
    let dataTradeLength:Array<Array<any>>=null;

    dataPL = trades.map((trade)=>[trade.Pair+trade.OpenDate,trade.PL]);         
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

    dataTradeLength = trades
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

    
  }

  createBalanceHistoryChart(dataBalanceHistory:any[][]) {
    dataBalanceHistory.unshift(["Date","Balance"]);
    this.balanceHistoryChart =
    {
      chartType:'Line',
      dataTable:dataBalanceHistory,
      options : 
      {
        chart: { title: "Balance History", legend: { position: 'none' } },
        hAxis: { title:"Date" }, 
        series:{ 1: {curveType: 'function'} },
        vAxis: { title:"Balance"},
        height: 400
      }
    }
  }
  
  

  setupChartsFilterOld(sessionInfo:Session,pair:string) {
    let dataPL:Array<Array<any>>=null;
    let dataTradeLength:Array<Array<any>>=null;
    let dataPLByPair:Array<Array<any>>=null;
    let dataBalanceHistory:Array<Array<any>>=null;
    let dataCountByPair:Array<Array<any>>=null;
    let trades:Trade[] = null;
    if(pair!='ALL')
    {
        trades = sessionInfo
                .SessionUser
                .Accounts
                .Primary
                .ClosedTrades
                .filter(x => x.Pair==pair)
    }
    else
    {
      trades = sessionInfo
              .SessionUser
              .Accounts
              .Primary
              .ClosedTrades
    }
    
    dataPL = trades.map((trade)=>[trade.Pair+trade.OpenDate,trade.PL]);         
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
    

    dataTradeLength = trades
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

    /*let closedTrades =sessionInfo
                      .SessionUser
                      .Accounts
                      .Primary
                      .ClosedTrades;*/

    dataPLByPair = this.uniquePairs(trades)
                    .map((pair)=>[pair,this.sumPL(pair,trades)]);

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

    dataCountByPair = this.uniquePairs(trades)
                    .map((pair)=>[pair,this.countPL(pair,trades)]);
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
