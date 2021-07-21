import { TestBed } from '@angular/core/testing';

import { CanDeactivateCreateGuard } from './can-deactivate-create.guard';

describe('CanDeactivateCreateGuard', () => {
  let guard: CanDeactivateCreateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateCreateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
