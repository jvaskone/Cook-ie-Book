import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

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
import { RecipeDetailsComponent } from './recipes/recipe-details.component';
import { RecipeResolver } from './recipes/recipe-resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,    
    Error404Component,
    CalendarComponent,
    CreateRecipeComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    RecipeResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
