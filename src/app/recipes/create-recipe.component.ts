import { Component } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { Router } from '@angular/router';
import { RecipeService } from './shared/recipe.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'create-recipe',
  templateUrl:  "create-recipe.component.html",
  styles: [
  `
  .row {     
     padding: 10px; 
  }`  
  ]
})
export class CreateRecipeComponent {
  newRecipe ?: IRecipe;
  isDirty : boolean = true;
  imageData ?: any;
  constructor(private router:Router, private recipeService:RecipeService) {

  }

  isValid(formControl: AbstractControl) : boolean {
    return formControl==null || !(formControl.invalid && formControl.touched);
  }

  getCategories() {
    return this.recipeService.getCategories();
  }

  saveRecipe(formValues:any) {
    this.addImageDataToRecipe(formValues);
    this.recipeService.saveRecipe(formValues).subscribe( () => {
     this.isDirty = false;
     this.router.navigate(['/recipes']);
    });
  }

  private addImageDataToRecipe(formValues:any) {
    formValues.image = this.imageData;
  }

  cancel() {
    if (this.isDirty) {
      if (confirm(`Biztosan elhagyod az oldalt mentés nélkül?`)) {
        this.router.navigate(['/recipes']);
      }
    } else {
      this.router.navigate(['/recipes']);
    }
  }

  addFile(event: any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageData = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);        
      }
}
}







