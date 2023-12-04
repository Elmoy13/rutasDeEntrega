import { TestBed } from '@angular/core/testing';

import { SqliteSalesContentService } from './sqlite-sales-content.service';

describe('SqliteSalesContentService', () => {
  let service: SqliteSalesContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteSalesContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
