import { TestBed } from '@angular/core/testing';

import { CountryRegionService } from './country-region.service';

describe('CountryRegionService', () => {
  let service: CountryRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
