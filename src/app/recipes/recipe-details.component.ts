import { Component, OnInit } from '@angular/core';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IRecipe } from './shared/recipes.model';

@Component({
  templateUrl: 'recipe-details.component.html',
  styleUrls: ['recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: IRecipe;
  filterBy: string = 'all';
  sortBy: string = 'name';
  editing:boolean=false;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  /*ngOnInit() {
    this.route.data.forEach((data) => {
      this.recipe = this.route.snapshot.data['recipe'];
    });
  }*/


  ngOnInit() {    
    this.route.params.forEach((params: Params) =>{
      const resolvedRecipe = this.route.snapshot.data['recipe'];
      this.errorMessage = resolvedRecipe.error;
      this.recipe = resolvedRecipe.recipe;
      //  this.recipeService.getRecipe(+params['id'])?.subscribe((recipe:IRecipe) => {
      //    this.recipe = recipe;
      //  });
    })

  }

  getCategory(recipe: IRecipe | undefined) {
    if (recipe == null) {
      return "";
    }
    return this.recipeService.getCategory(recipe.categoryId)?.name;
  }

  doSubmit() {
    this.editing = false;
      console.log("submit");
  }

}
