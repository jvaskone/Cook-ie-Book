import { Component, OnInit } from '@angular/core';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IRecipe } from './shared/recipes.model';

@Component({
  templateUrl: 'recipe-details.component.html',
  styles: [
    `
      .recipe-image {
        width: 100%;
        max-width: 400px;
        height: auto;
      }
      a {
        cursor: pointer;
      }
      .text-style {
        white-space: pre-wrap
      }
    `,
  ],
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: IRecipe;
  filterBy: string = 'all';
  sortBy: string = 'name';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  /*ngOnInit() {
    this.route.data.forEach((data) => {
      this.recipe = data['recipe'];
    });
  }*/


  ngOnInit() {
    /*
    this.route.params.forEach((params: Params) =>{
      this.recipeService.getRecipe(+params['id'])?.subscribe((recipe:IRecipe) => {
        this.recipe = recipe;
      });
    })*/

     this.recipe = this.recipeService.getRecipe(
       +this.route.snapshot.params['id']
     );
  }

}
