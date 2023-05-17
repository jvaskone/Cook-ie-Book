import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { RecipeService } from "./shared/recipe.service";
import { IRecipe, RecipeResolved } from "./shared/recipes.model";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<RecipeResolved> {

  constructor(private recipeService: RecipeService) {

  }

  resolve(route:ActivatedRouteSnapshot): Observable<RecipeResolved> {
    const id = +route.params['id'];
    if (isNaN(id)) {
      const message = `A recept azonosítója nem szám: ${id} `;
      console.error(message);
      return of(<RecipeResolved>{recipe: null, error:message});
    }
    return this.recipeService.getRecipe(+id)
      .pipe(
        map(recipe => ({recipe: recipe})),
          catchError(error => {
            const message = `Hiba: ${error}`;
            console.error(message);
            return of({recipe: null, error:message});
          })
      );
  }

}
