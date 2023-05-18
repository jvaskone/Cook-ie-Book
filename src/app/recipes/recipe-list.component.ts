import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  template: `
    <div class="container">
      <div *ngFor="let recipe of recipes" class="row">
        <div class="col-md"></div>
        <div class="col-md-8">
        <recipe-thumbnail  [recipe]="recipe" [category]="getCategory(recipe.categoryId)"         (eventClick)="handleThumbnailClicked(recipe.categoryId)" ></recipe-thumbnail>
        <hr>
        </div>
        <div class="col-md"></div>
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
    this.route.queryParamMap.subscribe((params: any) => {
        this.searchTerm = this.route.snapshot.queryParamMap.get('searchQuery') || '';
   });

  }

  ngOnInit(): void {
    //this.searchTerm = this.route.snapshot.queryParamMap.get('searchQuery') || '';
    this.recipeService.getRecipes(this._searchTerm).subscribe(recipes => {this.recipes = recipes;});
  }

  get searchTerm():string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
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

