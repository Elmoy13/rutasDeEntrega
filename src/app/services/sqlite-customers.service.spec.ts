import { TestBed } from '@angular/core/testing';

import { SqliteCustomersService } from './sqlite-customers.service';

describe('SqliteCustomersService', () => {
  let service: SqliteCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
