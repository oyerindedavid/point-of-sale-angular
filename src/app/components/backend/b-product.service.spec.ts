import { TestBed } from '@angular/core/testing';

import { BProductService } from './b-product.service';

describe('BProductService', () => {
  let service: BProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
