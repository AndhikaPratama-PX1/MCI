import { TestBed } from '@angular/core/testing';

import { MciServiceService } from './mci-service.service';

describe('MciServiceService', () => {
  let service: MciServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MciServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
