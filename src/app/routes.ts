import { Routes } from "@angular/router"
import { CreateRecipeComponent } from "./recipes/create-recipe.component"
import { RecipeListComponent } from "./recipes/recipe-list.component"
import { CalendarComponent } from "./calendar/calendar.component"

export const appRoutes:Routes = [
  { path: 'new-recipe', component:CreateRecipeComponent},
  { path: 'recipes', component:RecipeListComponent },
  { path: 'calendar', component:CalendarComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
]
