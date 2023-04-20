import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { appRoutes}  from './routes';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { RecipeListComponent } from './recipes/recipe-list.component';
import { Error404Component } from './errors/Error404Component';
import { RecipeThumbnailComponent } from './recipes/recipe-thumbnail.component';
import { RecipeService } from './recipes/shared/recipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Error404Component,
    CalendarComponent,
    CreateRecipeComponent,
    RecipeListComponent,
    RecipeThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
