import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { RecipeService } from './shared/recipe.service';

@Component({
  selector: 'recipe-list',
  template: `
    <div class="row">
      <div *ngFor="let recipe of recipes" class="col-md-5">
        <recipe-thumbnail  [recipe]="recipe"
        (click)="handleThumbnailClicked(recipe.name)" ></recipe-thumbnail>
        <hr>
      </div>
  </div>
  ` ,
  styles: [`
    hr {      
      border-color: #271c19;
    }
  `]
})
export class RecipeListComponent {
  recipes?: IRecipe[];
  constructor(private recipeService : RecipeService) {

  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {this.recipes = recipes;});
  }

  handleThumbnailClicked(recipeName: any) {
    console.log(recipeName);
  }
}

