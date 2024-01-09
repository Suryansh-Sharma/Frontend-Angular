import { TestBed } from '@angular/core/testing';

import { VisualiseApiService } from './visualise-api.service';

describe('VisualiseApiService', () => {
  let service: VisualiseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualiseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
