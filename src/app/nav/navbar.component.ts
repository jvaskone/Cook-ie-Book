import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    searchTerm : string = "";
    isCollapsed : boolean = true;
//    foundRecipess : IRecipe[] = [];
  
    searchRecipe(searchTerm:string) {
        // this.eventService.searchRecipes(searchTerm).subscribe(
        //     recipes => {
        //       this.foundRecipes = recipes;
        //     }
        // );
    }

}

