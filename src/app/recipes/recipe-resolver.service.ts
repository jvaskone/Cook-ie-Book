import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { RecipeService } from "./shared/recipe.service";

@Injectable()
export class RecipeResolver implements Resolve<any> {

  constructor(private recipeService: RecipeService) {

  }

  resolve(route:ActivatedRouteSnapshot) {
    return this.recipeService.getRecipe(route.params['id']);
  }

}
