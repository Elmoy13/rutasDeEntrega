import { TestBed } from '@angular/core/testing';

import { SqliteFolioService } from './sqlite-folio.service';

describe('SqliteFolioService', () => {
  let service: SqliteFolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteFolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
