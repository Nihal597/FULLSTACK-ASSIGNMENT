import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkPasswordRecoveryRequestGuard } from './check-password-recovery-request.guard';

describe('checkPasswordRecoveryRequestGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkPasswordRecoveryRequestGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
