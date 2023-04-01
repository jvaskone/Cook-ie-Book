export interface IRecipe {
  id: number;
  name: string;
  imageUrl: string;
  temperature?: number;
  cookingTime?: number;
  ingredients: string;
  instructions: string;
}
