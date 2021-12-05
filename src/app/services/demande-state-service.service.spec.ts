import { TestBed } from '@angular/core/testing';

import { DemandeStateServiceService } from './demande-state-service.service';

describe('DemandeStateServiceService', () => {
  let service: DemandeStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
