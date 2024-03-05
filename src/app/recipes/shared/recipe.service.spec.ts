import { RecipeService } from "./recipe.service";
import { IRecipe } from "./recipes.model";
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RecipeService', () => {
    let service: RecipeService;
    let injector: TestBed;
    let mockHttp: HttpTestingController;    
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RecipeService]
          });
        injector = getTestBed();
        service = injector.inject(RecipeService);
        mockHttp = injector.inject(HttpTestingController);
    });

    afterEach(() => {
        mockHttp.verify();
    });

    describe('deleteRecipe', () => {
        it( 'should call delete with the proper URL', () => {
              service.deleteRecipe(1).subscribe(result => {                
              });
              const req = mockHttp.expectOne(`/api/recipes/1`);
              expect(req.request.method).toBe("DELETE");              
              req.flush({});
        })
    })


    describe('#getRecipe', () => {
        it(
            'should get recipe with given id',
            inject(
            [HttpTestingController, RecipeService],
            (httpMock: HttpTestingController, recipeService: RecipeService) => {
                const mockRecipe = 
                    <IRecipe>{ id: 1, name: 'Leves 1' };
        
                recipeService.getRecipe(1).subscribe( recipe => {
                    expect(recipe.id).toBe(1);
                });
        
                const mockReq = httpMock.expectOne(`/api/recipes/1`);        
                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');
                mockReq.flush(mockRecipe);                    
            }
            )
        );
    });

  describe('#getRecipes', () => {
    it('should return an Observable<IRecipe[]>', () => {
      const dummyRecipes = [
        <IRecipe>{ id: 1, name: 'Leves 1' },
        <IRecipe>{ id: 2, name: 'Leves 2' }
      ];
        
      service.getRecipes().subscribe(recipes => {
        expect(recipes.length).toBe(2);
        expect(recipes).toEqual(dummyRecipes);
        
      });
  
      const req = mockHttp.expectOne(`/api/recipes`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyRecipes);
    });
  });

 })