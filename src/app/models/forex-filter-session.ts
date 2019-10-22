export interface FilterSession {
    Id:                         string;
    FilterPair:                 string;
    StartDate:                  string;
    CurrentTime:                string;
    RealizedPL:                 number;
    ClosedTrades:               number;
    PercentProfitableClosed:    number;
    OpenTrades:                 number;
    PercentProfitableOpen:      number;
    Balance:                    number;
}