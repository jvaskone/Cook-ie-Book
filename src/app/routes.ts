import { Routes } from "@angular/router"
import { CreateRecipeComponent } from "./recipes/create-recipe.component"
import { RecipeListComponent } from "./recipes/recipe-list.component"
import { CalendarComponent } from "./calendar/calendar.component"
import { Error404Component } from "./errors/Error404Component"
import { RecipeDetailsComponent } from "./recipes/recipe-details.component"
import { RecipeResolver } from "./recipes/recipe-resolver.service"
//import { RecipeEditComponent } from "./recipes/recipe-edit.component"

export const appRoutes:Routes = [
  { path: 'recipes/0/edit', component:CreateRecipeComponent},
  { path: 'recipes', component:RecipeListComponent },
  { path: 'recipes/:id' , component: RecipeDetailsComponent, resolve: { recipe: RecipeResolver}},
//  { path: 'recipes/:id/edit' , component: RecipeEditComponent /** , resolve: { recipe: RecipeResolver}*/},
  { path: 'calendar', component:CalendarComponent },
  { path: '404', component:Error404Component },
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
]
