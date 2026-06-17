import { TestBed } from '@angular/core/testing';

import { NavigationserviceService } from './navigationservice.service';

describe('NavigationserviceService', () => {
  let service: NavigationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
