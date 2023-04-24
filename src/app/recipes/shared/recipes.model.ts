export interface IRecipe {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  temperature?: number;
  cookingTime?: number;
  ingredients: string;
  instructions: string;
}
