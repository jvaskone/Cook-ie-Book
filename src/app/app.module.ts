import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { appRoutes}  from './routes';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateRecipeComponent } from './recipes/create-recipe.component';
import { RecipeListComponent } from './recipes/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    CreateRecipeComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
