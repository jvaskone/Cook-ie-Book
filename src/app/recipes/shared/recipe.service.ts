import { Injectable } from "@angular/core";
import { IRecipe } from "./recipes.model";
import { Observable, catchError, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RecipeService {

    constructor(private http: HttpClient) {

    }

    getRecipes(): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>('/api/recipes')
            .pipe(catchError(this.handleError<IRecipe[]>('getRecipes', [])));
    }

    getCategories(): string[] {
        return CATEGORIES;
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

    private handleError<T> (operation = 'operation', result? : T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of (result as T);
        }
    }
    
}

const CATEGORIES: string[] = [
        "Leves",
        "Főétel",
        "Főzelék",
        "Sütemény",
        "Torta",
        "Saláta",
        "Befőzés"
];

