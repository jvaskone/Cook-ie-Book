import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { Router } from '@angular/router';
import { RecipeService } from './shared/recipe.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'create-recipe',
  templateUrl:  "create-recipe.component.html"
})
export class CreateRecipeComponent {
  newRecipe ?: IRecipe;
  isDirty : boolean = true;
  image ?: any;
  constructor(private router:Router, private recipeService:RecipeService) {

  }

  isValid(formControl: AbstractControl) : boolean {
    return formControl==null || !(formControl.invalid && formControl.touched);
  }

  saveRecipe(formValues:any) {
    // this.recipeService.saveRecipe(formValues).subscribe( () => {
    //   this.isDirty = false;
    //   this.router.navigate(['/recipes']);
    // });
    this.recipeService.saveRecipe(formValues);
    this.isDirty = false;
    this.router.navigate(['/recipes']);
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }

  addFile(event: any) {    
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.image = event.target.result;
            //console.log(this.url);
        }
        reader.readAsDataURL(event.target.files[0]);
        //this.newRecipe.imageUrl = event.target.files[0];
    }
}
}







