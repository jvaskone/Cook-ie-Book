import { TestBed } from '@angular/core/testing';

import { DemoRecipeService } from './demo-recipe.service';

describe('DemoRecipeService', () => {
  let service: DemoRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
