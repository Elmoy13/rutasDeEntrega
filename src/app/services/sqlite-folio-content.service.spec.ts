import { TestBed } from '@angular/core/testing';

import { SqliteFolioContentService } from './sqlite-folio-content.service';

describe('SqliteFolioContentService', () => {
  let service: SqliteFolioContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteFolioContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
