import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  template: `
    <div class="container-fluid">
      <div *ngFor="let recipe of recipes" class="row">
        <recipe-thumbnail  [recipe]="recipe" [category]="getCategory(recipe.categoryId)"         (eventClick)="handleThumbnailClicked(recipe.categoryId)" ></recipe-thumbnail>
        <hr>
      </div>
  </div>
  ` ,
  styles: [`
    hr {      
      border-color: #fff3ec;
      background-color: ##fff3ec;
      margin-bottom: 0px;      
    }
  `]
})
export class RecipeListComponent {
  recipes?: IRecipe[];  
  _searchTerm = '';

  constructor(private recipeService : RecipeService, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log("INIT LIST");
    this.recipeService.getRecipes().subscribe(recipes => {this.recipes = recipes;});
    //this.recipes = this.route.snapshot.data['recipes'];
    this._searchTerm = this.route.snapshot.queryParamMap.get('searchQuery') || '';
  }

  get searchTerm():string {
    return this._searchTerm;
  }

  set listFilter(value: string) {
    this._searchTerm = value;
    this.recipeService.getRecipes(this.searchTerm).subscribe(recipes => {this.recipes = recipes;});
  }

  getCategory(i: number) {    
    return this.recipeService.getCategory(i)?.name;
  }

  handleThumbnailClicked(recipeName: any) {
    //console.log(recipeName);
  }
}

