import { TestBed } from '@angular/core/testing';

import { BankrollGuardGuard } from './bankroll-guard.guard';

describe('BankrollGuardGuard', () => {
  let guard: BankrollGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BankrollGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
