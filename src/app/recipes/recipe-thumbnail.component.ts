import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IRecipe } from "./shared/recipes.model";
import { RecipeService } from "./shared/recipe.service";
import { Router } from "@angular/router";

@Component({
  selector: 'recipe-thumbnail',
  template: `
  <div
      class="hoverwell thumbnail" (click)="handleClickMe()" >
      <ul [routerLink]="['/recipes', recipe?.id]" routerLinkActive="router-link-active">
        <li><img *ngIf="recipe?.imageUrl" [src]="recipe?.imageUrl" [alt]="recipe?.name" class="recipe-image" [attr.data-color]="recipe?.categoryId"></li>
        <li><img *ngIf="!recipe?.imageUrl" [src]="recipe?.image" [alt]="recipe?.name" class="recipe-image" [attr.data-color]="recipe?.categoryId"></li>
        <ul style="margin: auto; padding: 10px; float:left;">
        <li class="header">{{recipe?.name}}</li>
        <li class="category" [attr.data-color]="recipe?.categoryId">{{category}}</li>
        </ul>
        <li style="margin-top: 10px; padding: 10px; float:right" (click)="deleteRecipe()" ><i class="fa fa-trash"></i></li>
        <li style="margin-top: 10px; padding: 10px; float:right" (click)="editRecipe()" ><i class="fa fa-pencil" [routerLink]="['/recipes', recipe?.id, 'edit']" routerLinkActive="router-link-active"></i></li>
      </ul>
  </div>
  `,
  styleUrls: ['recipe-thumbnail.component.css']
})
export class RecipeThumbnailComponent {
  @Input() recipe ?: IRecipe;
  @Input() category ?: any;
  @Output() eventClick = new EventEmitter();  

  constructor(private recipeService : RecipeService,
    private router:Router) {

  }

  handleClickMe() {
    this.eventClick.emit(this.recipe?.name);
  }

  editRecipe(): void {
    this.router.navigate(['/recipes/'+this.recipe?.id+'/edit']);
  }

  deleteRecipe(): void {
    if (this.recipe == null) {
      //       
    } else {
      if (confirm(`Biztosan törlöd a receptet: ${this.recipe.name}?`)) {
         this.recipeService.deleteRecipe(this.recipe.id).subscribe({
          //  next: () => this.onSaveComplete(`${this.recipe?.name} törölve.`),
          //  error: err => this.errorMessage = err
         });
      }
    }
    this.router.navigate(['/recipes']);
  }


}
