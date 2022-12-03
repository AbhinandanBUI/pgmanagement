import { TestBed } from '@angular/core/testing';

import { UpsIncService } from './ups-inc.service';

describe('UpsIncService', () => {
  let service: UpsIncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpsIncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
