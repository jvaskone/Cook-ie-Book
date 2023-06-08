import { Component, OnInit } from '@angular/core';
import { RecipeService } from './shared/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from './shared/recipes.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  templateUrl: 'recipe-details.component.html',
  styleUrls: [
     'recipe-details.component.css', 'recipe-details.component.printable.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: IRecipe;
  filterBy: string = 'all';
  sortBy: string = 'name';
  editing:boolean=false;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  /*ngOnInit() {
    this.route.data.forEach((data) => {
      this.recipe = this.route.snapshot.data['recipe'];
    });
  }*/


  ngOnInit() {    
    this.route.params.forEach((params: Params) =>{
      const resolvedRecipe = this.route.snapshot.data['recipe'];
      this.errorMessage = resolvedRecipe.error;
      this.recipe = resolvedRecipe.recipe;
      //  this.recipeService.getRecipe(+params['id'])?.subscribe((recipe:IRecipe) => {
      //    this.recipe = recipe;
      //  });
    })

  }

  getCategory(recipe: IRecipe | undefined) {
    if (recipe == null) {
      return "";
    }
    return this.recipeService.getCategory(recipe.categoryId)?.name;
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


  public printToPDF(): void {
    let DATA = document.getElementById('content');
    document.getElementById('no-print')?.classList.add('hidden');    
    if (DATA == null) {
      return;
    }         
    DATA.classList.add('print');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('cook-e-book.pdf');      
    });
    DATA.classList.remove('print');
    document.getElementById('no-print')?.classList.remove('hidden');
    
  }
}
