import { TestBed } from '@angular/core/testing';

import { ForexPricesIndicatorService } from './forex-prices-indicator.service';

describe('ForexPricesIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForexPricesIndicatorService = TestBed.get(ForexPricesIndicatorService);
    expect(service).toBeTruthy();
  });
});
