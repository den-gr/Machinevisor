import { TestBed } from '@angular/core/testing';

import { OnOffButtonService } from './on-off-button.service';

describe('OnOffButtonService', () => {
  let service: OnOffButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnOffButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
