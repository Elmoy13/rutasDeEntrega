import { TestBed } from '@angular/core/testing';

import { SqliteWeekdaysService } from './sqlite-weekdays.service';

describe('SqliteWeekdaysService', () => {
  let service: SqliteWeekdaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteWeekdaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
