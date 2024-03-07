import { Component, Inject, OnInit } from '@angular/core';
import { IRecipe } from './shared/recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from './shared/recipe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  recipeForm: FormGroup = null!;
  newRecipe : IRecipe = null!;
  editmode: boolean = false;
  isDirty : boolean = true;
  imageData ?: any;  

  constructor(private router:Router, private route: ActivatedRoute,
    private recipeService:RecipeService, private formBuilder: FormBuilder) {
  }

  private initForm() {
    this.recipeForm = this.formBuilder.group({
      recipeName: ['', [Validators.required, Validators.maxLength(50)]],       
      recipeCategory: ['', Validators.required],
      recipeIngredients: ['', Validators.required],
      recipeInstructions: ['', Validators.required],
      recipeImageUrl: [null],
      recipeImage: [null],
      recipeId: [0]
    });
  }

  private initNewRecipe() {
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

  private populateRecipeData(editedRecipe: IRecipe) {
    this.recipeForm.patchValue({
      recipeName: editedRecipe?.name,
      recipeCategoryId: editedRecipe?.categoryId,
      recipeCategory: editedRecipe?.categoryId,
      recipeIngredients: editedRecipe?.ingredients,
      recipeInstructions: editedRecipe?.instructions,
      recipeImageUrl: editedRecipe?.imageUrl,
      recipeImage: editedRecipe?.image,
      recipeId: editedRecipe?.id
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.initNewRecipe();
    this.route.params.forEach((params: Params) =>{
          let id = params['id'];
          if(!isNaN(id) && id!=0) {
              //this fills the form if an existing recipe is modified
              this.recipeService.getRecipe(+id)?.subscribe((recipe:IRecipe) => {
                this.editmode = true;   
                this.imageData = recipe.image;  
                this.newRecipe.name = recipe.name;
                this.newRecipe.categoryId = recipe.categoryId;
                this.newRecipe.ingredients = recipe.ingredients;
                this.newRecipe.instructions = recipe.instructions;
                this.newRecipe.imageUrl = recipe.imageUrl;
                this.newRecipe.image = recipe.image;
                this.newRecipe.category = recipe.category;
                this.newRecipe.id = recipe.id;                                
                this.populateRecipeData(recipe);
                this.recipeForm.get('recipeImageUrl')?.setValidators([]);
                this.recipeForm.get('recipeImageUrl')?.updateValueAndValidity();
            });
          }
      })      
      
}  

  getCategories() {
    return this.recipeService.getCategories();
  }

  saveRecipe() {
    if (this.editmode) {
      this.updateRecipe();
    } else {
      this.addDataToRecipe();      
      this.recipeService.saveRecipe(this.newRecipe).subscribe( () => {
        this.isDirty = false;
        this.router.navigate(['/recipes']);
      });
    }
  }

  updateRecipe() {
    //console.log(this.newRecipe);
    this.addDataToRecipe();
    this.recipeService.updateRecipe(this.newRecipe).subscribe( () => {
      this.isDirty = false;
      this.router.navigate(['/recipes']);
    });
  }

  private addDataToRecipe() {
    this.newRecipe.image = this.imageData;
    this.newRecipe.name = this.recipeForm.get('recipeName')?.value;
    this.newRecipe.categoryId = this.recipeForm.get('recipeCategory')?.value;
    let category = this.recipeService.getCategory(this.newRecipe.categoryId);
    if (category) {
      this.newRecipe.category = category;
    }    
    this.newRecipe.ingredients = this.recipeForm.get('recipeIngredients')?.value;
    this.newRecipe.instructions = this.recipeForm.get('recipeInstructions')?.value;
    this.newRecipe.imageUrl = this.recipeForm.get('recipeImageUrl')?.value;
    if(!this.newRecipe.imageUrl && ! this.newRecipe.image) {
      let cat = this.newRecipe.categoryId;      
      switch (+cat) {
          case 1: {
            this.newRecipe.imageUrl = "assets/images/leves.jpg";            
            break;
          }
          case 2: {
            this.newRecipe.imageUrl = "assets/images/foetel.jpg";
            break;
          }
          case 3: {
            this.newRecipe.imageUrl = "assets/images/fozelek.jpg";
            break;
          }
          case 4: {
            this.newRecipe.imageUrl = "assets/images/suti.jpg";
            break;
          }
          case 5: {
            this.newRecipe.imageUrl = "assets/images/torta.jpg";
            break;
          }
          case 6: {
            this.newRecipe.imageUrl = "assets/images/salata.jpg";
            break;
          }
          case 7: {
            this.newRecipe.imageUrl = "assets/images/befott.jpg";
            break;          
          }
        }                 
    }
    if(this.newRecipe.image == null) {
      this.loadImageToData(this.newRecipe);
    }
    console.log(this.newRecipe);
  }

  loadImageToData(recipe: IRecipe) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', recipe.imageUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response as Blob;
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;          
          recipe.image = base64Data;          
        };
        reader.readAsDataURL(blob);
      } else {
        console.error('Error fetching image data:', xhr.statusText);
      }
    };
    xhr.send();
  }

  cancel() {
    if (this.recipeForm.dirty) {
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
        console.log(event.target.files[0]); 
      }      
}
}







