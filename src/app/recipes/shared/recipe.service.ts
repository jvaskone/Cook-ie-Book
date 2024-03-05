import { IRecipe, IRecipeCategory } from "./recipes.model";
import { Observable, of } from "rxjs";

export abstract class RecipeService {
    categories?: IRecipeCategory[];
    public static DEFAULT_PAGE_SIZE = 5;

    abstract getRecipes(searchTerm?: string, pageNumber?:number,
        pageSize?: number): Observable<IRecipe[]>;

    abstract getRecipe(id: number): Observable<IRecipe>;

    abstract saveRecipe(recipe: IRecipe): Observable<IRecipe>;

    abstract updateRecipe(recipe: IRecipe): Observable<IRecipe>;

    abstract deleteRecipe(id: number): Observable<{}>;

    abstract initCategories(): void;    

    getCategories(): IRecipeCategory[] | undefined {
        if(this.categories == null) {
            this.initCategories();
        }
        return this.categories;
    }

    getCategory(id: number) : IRecipeCategory | undefined {
        if(this.categories == null) {
            this.initCategories();
        }
        if (this.categories != null) {
            return this.categories[id-1];
        }
        return undefined;
    }

    handleError<T> (operation = 'operation', result? : T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of (result as T);
        }
    }
    
}

// const CATEGORIES: IRecipeCategory[] = [
//         {id: 1, name: "Leves"},
//         {id: 2, name: "Főétel"},
//         {id: 3, name: "Főzelék"},
//         {id: 4, name: "Sütemény"},
//         {id: 5, name: "Torta"},
//         {id: 6, name: "Saláta"},
//         {id: 7, name: "Befőzés"}
// ];

