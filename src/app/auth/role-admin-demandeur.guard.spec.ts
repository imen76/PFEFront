import { TestBed } from '@angular/core/testing';

import { RoleAdminDemandeurGuard } from './role-admin-demandeur.guard';

describe('RoleAdminDemandeurGuard', () => {
  let guard: RoleAdminDemandeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAdminDemandeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
