import { TestBed } from '@angular/core/testing';

import { ForexSessionsService } from './forex-sessions.service';

describe('ForexSessionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForexSessionsService = TestBed.get(ForexSessionsService);
    expect(service).toBeTruthy();
  });
});
