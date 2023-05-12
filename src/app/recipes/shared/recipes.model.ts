export interface IRecipe {
  id: number;
  name: string;
  imageUrl: string;
  image: any;
  category: IRecipeCategory;
  categoryId: number;
  temperature?: number;
  cookingTime?: number;
  ingredients: string;
  instructions: string;
}

export interface IRecipeCategory {
  id: number;
  name: string;
}