import { TestBed } from '@angular/core/testing';

import { LocalRecipeService } from './local-recipe-service';

describe('LocalRecipeServiceService', () => {
  let service: LocalRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
