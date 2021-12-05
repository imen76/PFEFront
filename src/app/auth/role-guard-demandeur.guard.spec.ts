import { TestBed } from '@angular/core/testing';

import { RoleGuardDemandeurGuard } from './role-guard-demandeur.guard';

describe('RoleGuardDemandeurGuard', () => {
  let guard: RoleGuardDemandeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuardDemandeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
