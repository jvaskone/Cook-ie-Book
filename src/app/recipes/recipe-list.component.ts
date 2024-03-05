import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: IRecipe[] = [];  
  _searchTerm = '';
  page: number = 1;
  itemsPerPage = RecipeService.DEFAULT_PAGE_SIZE;
  totalItemCount = 1;

  configData: any; 
  useBackend: boolean = true;

  constructor(private recipeService : RecipeService, private route:ActivatedRoute) {
    this.route.queryParamMap.subscribe((params: any) => {
        this.searchTerm = this.route.snapshot.queryParamMap.get('searchQuery') || '';        
      });
  }

  
  ngOnInit(): void {      
    //this.searchTerm = this.route.snapshot.queryParamMap.get('searchQuery') || '';
    this.updateRecipes();
  }

  private updateRecipes() {
    this.recipeService.getRecipes(this._searchTerm, this.page, 
      this.itemsPerPage).subscribe(response => {
        this.recipes = response;
    //   if (response.body !=null) {
    //     this.recipes = response.body;
    //   }      
    //   var s = response.headers.get("X-pagination");
    //   if (s!= null) {
    //     this.parsePaginationMetadata(s);        
    //   }    
     });
  }

  // private parsePaginationMetadata(s: string) {    
  //   var pagingInfo : string[] = s.split(",");
  //   this.totalItemCount = +(pagingInfo[0].slice(18));
  // }

  pageChanged(s:any) {
    this.page = +s;
    this.updateRecipes();
  }

  get searchTerm():string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.recipeService.getRecipes(this.searchTerm).subscribe(response => {
      this.recipes = response;
      // if (response.body !=null) {
      //   this.recipes = response.body;        
      // }
    });
  }

  getCategory(i: number) {    
    return this.recipeService.getCategory(i)?.name;
  }

  handleThumbnailClicked(recipeName: any) {
    //console.log(recipeName);
  }
}

