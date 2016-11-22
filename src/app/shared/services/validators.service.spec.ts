/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';

describe('Service: Validators', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorsService]
    });
  });

  it('should ...', inject([ValidatorsService], (service: ValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});