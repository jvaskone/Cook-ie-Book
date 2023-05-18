import { Component, OnInit } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './shared/recipe.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'create-recipe',
  templateUrl:  "create-recipe.component.html",
  styles: [
  `
  em {
    color: red;
  }
  .row {     
     padding: 10px; 
  }`  
  ]
})
export class CreateRecipeComponent implements OnInit {
  newRecipe : IRecipe;
  editedRecipe ?: IRecipe;
  editmode: boolean = false;
  isDirty : boolean = true;
  imageData ?: any;
  constructor(private router:Router, private route: ActivatedRoute,
    private recipeService:RecipeService) {
      this.newRecipe = {
        name: "",
        id: 0,
        categoryId: 0,
        category: { 
          id: 0,
          name: ""},
        ingredients: "",
        instructions: "",
        imageUrl: "",
        image: null
      }
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) =>{
          let id = params['id'];
          if(!isNaN(id)) {
              //this fills the form if an existing recipe is modified
              this.recipeService.getRecipe(+id)?.subscribe((recipe:IRecipe) => {
              this.editedRecipe = recipe;
              this.imageData = this.editedRecipe.image;  
              this.editmode = true;   
              this.newRecipe.name = this.editedRecipe.name;
              this.newRecipe.categoryId = this.editedRecipe.categoryId;
              this.newRecipe.ingredients = this.editedRecipe.ingredients;
              this.newRecipe.imageUrl = this.editedRecipe.imageUrl;
              this.newRecipe.image = this.editedRecipe.image;
              this.newRecipe.category = this.editedRecipe.category;
              this.newRecipe.id = this.editedRecipe.id;                    
            });
          }
      })      
      
}  

  isValid(formControl: AbstractControl) : boolean {
    //let b = this.editedRecipe!= null || formControl==null || !(formControl.invalid && formControl.touched); 
    //console.log(">>ISVALID: " + formControl?.value+ b);
    //return this.editmode || formControl==null || !(formControl.invalid && formControl.touched);
    return formControl!=null && formControl.valid;
  }

  isValidCategory(formControl: AbstractControl) : boolean {
    return formControl!=null && formControl.valid;
  }

  getCategories() {
    return this.recipeService.getCategories();
  }

  saveRecipe(formValues:any) {
    if (this.editmode) {
      this.updateRecipe(formValues);
    } else {
      this.addImageDataToRecipe(formValues);
      this.recipeService.saveRecipe(formValues).subscribe( () => {
        this.isDirty = false;
        this.router.navigate(['/recipes']);
      });
    }
  }

  updateRecipe(formValues:any) {
    this.recipeService.updateRecipe(this.newRecipe).subscribe( () => {
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







