import { TestBed } from '@angular/core/testing';

import { AddDemandeService } from './add-demande.service';

describe('AddDemandeService', () => {
  let service: AddDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDemandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
