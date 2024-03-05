import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { IRecipe } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class DemoRecipeService extends RecipeService {


  constructor() { super() }  
  override getRecipes(searchTerm?: string | undefined, pageNumber?: number | undefined, pageSize?: number | undefined): Observable<IRecipe[]> {
    throw new Error('Method not implemented.');
  }
  override getRecipe(id: number): Observable<IRecipe> {
    throw new Error('Method not implemented.');
  }
  override saveRecipe(recipe: IRecipe): Observable<IRecipe> {
    throw new Error('Method not implemented.');
  }
  override updateRecipe(recipe: IRecipe): Observable<IRecipe> {
    throw new Error('Method not implemented.');
  }
  override deleteRecipe(id: number): Observable<{}> {
    throw new Error('Method not implemented.');
  }
  override initCategories(): void {
    throw new Error('Method not implemented.');
  }

}
