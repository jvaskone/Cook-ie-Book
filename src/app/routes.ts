import { Routes } from "@angular/router"
import { CreateRecipeComponent } from "./recipes/create-recipe.component"
import { RecipeListComponent } from "./recipes/recipe-list.component"
import { CalendarComponent } from "./calendar/calendar.component"
import { Error404Component } from "./errors/Error404Component"
import { RecipeDetailsComponent } from "./recipes/recipe-details.component"

export const appRoutes:Routes = [
  { path: 'new-recipe', component:CreateRecipeComponent},
  { path: 'recipes', component:RecipeListComponent },
  { path: 'recipes/:id' , component: RecipeDetailsComponent},
  { path: 'calendar', component:CalendarComponent },
  { path: '404', component:Error404Component },
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
]
