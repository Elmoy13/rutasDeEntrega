import { TestBed } from '@angular/core/testing';

import { SqliteSalesService } from './sqlite-sales.service';

describe('SqliteSalesService', () => {
  let service: SqliteSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
