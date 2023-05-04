import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IRecipe } from "./shared/recipes.model";

@Component({
  selector: 'recipe-thumbnail',
  template: `
  <!-- [routerLink]="['/events', event.id]" routerLinkActive="router-link-active" -->
  <div
      class="hoverwell thumbnail" (click)="handleClickMe()">
      <ul [routerLink]="['/recipes', recipe?.id]" routerLinkActive="router-link-active">
        <li><img [src]="recipe?.imageUrl" [alt]="recipe?.name" class="recipe-image"></li>
        <ul style="margin: auto; padding: 10px; float:left;">
        <li class="header">{{recipe?.name}}</li>
        <li class="text">{{category}}</li>
        </ul>
      </ul>
  </div>

  `,
  styles: [`    
    .thumbnail  { 
      min-height: 74px;        
    }
    li.header { font-size: 16px;}
    li.text { font-size: 12px;}
    ul { 
      list-style-type: none; 
      padding-inline-start: 5px;
      padding: 5px;
    }   
    img { 
      float:left;
      display: block;
      margin-left: auto;
      margin-right: auto;
      height: 64px;
      width: 84px;
      object-fit: cover;
    } 
    `]
})
export class RecipeThumbnailComponent {
  @Input() recipe ?: IRecipe;
  @Input() category ?: any;
  @Output() eventClick = new EventEmitter();
  handleClickMe() {
    this.eventClick.emit(this.recipe?.name);
  }

}
