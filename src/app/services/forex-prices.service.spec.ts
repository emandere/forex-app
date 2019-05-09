import { TestBed } from '@angular/core/testing';

import { ForexPricesService } from './forex-prices.service';

describe('ForexPricesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForexPricesService = TestBed.get(ForexPricesService);
    expect(service).toBeTruthy();
  });
});
