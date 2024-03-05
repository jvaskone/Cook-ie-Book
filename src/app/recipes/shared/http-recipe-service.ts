import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe, IRecipeCategory } from './recipes.model';
import { Observable, catchError, tap } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRecipeService extends RecipeService {
  private recipesUrl = '/api/recipes';

  constructor(private http: HttpClient) { 
    super();
  }

  getRecipes(searchTerm?: string, pageNumber = 1, 
    pageSize = RecipeService.DEFAULT_PAGE_SIZE): Observable<IRecipe[]> {         
    var url;
    if(searchTerm!=null) {
        url = '/api/recipes?searchQuery='+searchTerm+'&pageNumber='+pageNumber+'&pageSize='+pageSize;
    } else {
        url = '/api/recipes?'+'pageNumber='+pageNumber+'&pageSize='+pageSize;
    }
    
    return this.http.get<IRecipe[]>(url)
      .pipe(catchError(this.handleError<IRecipe[]>('getRecipes')));                
  }  

  getRecipe(id: number):Observable<IRecipe> {
    return this.http.get<IRecipe>('/api/recipes/' + id)
      .pipe(catchError(this.handleError<IRecipe>('getRecipe')));

  }
  
  saveRecipe(recipe: IRecipe) {        
    let options = { headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this.http.post<IRecipe>('/api/recipes/recipe', recipe, options)
        .pipe(catchError(this.handleError<IRecipe>('saveRecipe')));
  }  

  updateRecipe(recipe: IRecipe) { 
    let options = { headers: new HttpHeaders({'Content-type': 'application/json'})}
    return this.http.put<IRecipe>('/api/recipes/'+recipe.id, recipe, options)
        .pipe(catchError(this.handleError<IRecipe>('updateRecipe')));
  }


  deleteRecipe(id: number): Observable<{}> {
      let options = { headers: new HttpHeaders({'Content-type': 'application/json'})}
      const url = `${this.recipesUrl}/${id}`;
      return this.http.delete<IRecipe>(url, options)
        .pipe(catchError(this.handleError<IRecipe>('deleteRecipe')));
  }

  initCategories() {    
     this.http.get<IRecipeCategory[]>('/api/categories')
        .pipe(catchError(this.handleError<IRecipeCategory[]>('getRecipeCategories', [])))
        .subscribe(categories => {
            this.categories = categories;
        }); 
  }
      
}
