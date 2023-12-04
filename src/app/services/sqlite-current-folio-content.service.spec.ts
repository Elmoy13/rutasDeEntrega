import { TestBed } from '@angular/core/testing';

import { SqliteCurrentFolioContentService } from './sqlite-current-folio-content.service';

describe('SqliteCurrentFolioContentService', () => {
  let service: SqliteCurrentFolioContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteCurrentFolioContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
