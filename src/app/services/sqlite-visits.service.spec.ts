import { TestBed } from '@angular/core/testing';

import { SqliteVisitsService } from './sqlite-visits.service';

describe('SqliteVisitsService', () => {
  let service: SqliteVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
