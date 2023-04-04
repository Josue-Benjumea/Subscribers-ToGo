import { TestBed } from '@angular/core/testing';

import { ApirService } from './apir.service';

describe('ApirService', () => {
  let service: ApirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
