import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IRecipe } from "./shared/recipes.model";

@Component({
  selector: 'recipe-thumbnail',
  template: `
  <div
      class="hoverwell thumbnail" (click)="handleClickMe()" >
      <ul [routerLink]="['/recipes', recipe?.id]" routerLinkActive="router-link-active">
        <li><img [src]="recipe?.image" [alt]="recipe?.name" class="recipe-image" [attr.data-color]="recipe?.categoryId"></li>
        <ul style="margin: auto; padding: 10px; float:left;">
        <li class="header">{{recipe?.name}}</li>
        <li class="category">{{category}}</li>
        </ul>
      </ul>
  </div>
  `,
  styleUrls: ['recipe-thumbnail.component.css']
})
export class RecipeThumbnailComponent {
  @Input() recipe ?: IRecipe;
  @Input() category ?: any;
  @Output() eventClick = new EventEmitter();
  handleClickMe() {
    this.eventClick.emit(this.recipe?.name);
  }

}
