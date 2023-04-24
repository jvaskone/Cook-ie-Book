import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  template: `
    <div class="container">
      <div *ngFor="let recipe of recipes" class="row">
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
  constructor(private recipeService : RecipeService, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {this.recipes = recipes;});
    //this.recipes = this.route.snapshot.data['recipes'];
  }

  handleThumbnailClicked(recipeName: any) {
    console.log(recipeName);
  }
}

