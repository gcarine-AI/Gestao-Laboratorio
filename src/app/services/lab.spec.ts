import { TestBed } from '@angular/core/testing';

import { LabService } from './lab';

describe('Lab', () => {
  let service: LabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
