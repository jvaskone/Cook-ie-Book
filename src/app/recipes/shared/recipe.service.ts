import { Injectable } from "@angular/core";
import { IRecipe, IRecipeCategory } from "./recipes.model";
import { Observable, catchError, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RecipeService {
    categories?: IRecipeCategory[];
    private recipesUrl = '/api/recipes';

    constructor(private http: HttpClient) {
        this.initCategories();
    }
    
    getRecipes(searchTerm?: string): Observable<IRecipe[]> {
        if(searchTerm!=null) {
            return this.http.get<IRecipe[]>('/api/recipes?searchQuery='+searchTerm)
            .pipe(catchError(this.handleError<IRecipe[]>('getRecipes', [])));
        }
        return this.http.get<IRecipe[]>('/api/recipes')
            .pipe(catchError(this.handleError<IRecipe[]>('getRecipes', [])));
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

    getCategories(): IRecipeCategory[] | undefined {
        return this.categories;
    }

    getCategory(id: number) : IRecipeCategory | undefined {
        if (this.categories != null) {
            return this.categories[id-1];
        }
        return undefined;
    }

    initCategories() {
         this.http.get<IRecipeCategory[]>('/api/categories')
            .pipe(catchError(this.handleError<IRecipeCategory[]>('getRecipeCategories', [])))
            .subscribe(categories => {
                this.categories = categories;
            }); 

    }


    private handleError<T> (operation = 'operation', result? : T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of (result as T);
        }
    }
    
}

// const CATEGORIES: string[] = [
//         "Leves",
//         "Főétel",
//         "Főzelék",
//         "Sütemény",
//         "Torta",
//         "Saláta",
//         "Befőzés"
// ];

