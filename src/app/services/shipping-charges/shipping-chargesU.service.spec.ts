import { TestBed } from '@angular/core/testing';

import { ShippingChargesUService } from './shipping-chargesU.service';

describe('ShippingChargesService', () => {
  let service: ShippingChargesUService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingChargesUService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
