import { Injectable } from "@angular/core";
import { IRecipe } from "./recipes.model";
import { Observable, Subject } from "rxjs";

@Injectable()
export class RecipeService {

    getRecipes(): Observable<IRecipe[]> {
        let subject = new Subject<IRecipe[]>();
        setTimeout(() => {
            subject.next(RECIPES);
            subject.complete();
          }, 100);
          return subject;
    
        return subject;
    }

    getRecipe(id: number):IRecipe | undefined {
        return RECIPES.find(recipe => recipe.id === id);
    }

    saveRecipe(recipe: IRecipe) {
        recipe.id = 999;
        RECIPES.push(recipe);
    }
    
}

const RECIPES: IRecipe[] = [
    {
        id: 1,
        name: "Húsleves",
        imageUrl: "assets/husleves.jpg",
        ingredients: ``,
        instructions: ``
    },
    {
        id: 2,
        name: "Csirkepaprikás",
        imageUrl: "assets/csirkepaprikas.jpg",
        ingredients: `
            1 kg csirkehús
            2 fej vöröshagyma
            4 gerezd fokhagyma
            1 zöldpaprika
            1 paradicsom
            édesnemes őrölt fűszerpaprika
            só
            bors
            őrölt kömény
            1 kis pohár tejföl
            olaj
        `,
        instructions: `
        1. A vöröshagymát egy kevés olajon megpirítjuk, majd lehúzzuk a tűzről, és hozzáadjuk a fűszerpaprikát. A pörköltalaphoz adjuk hozzá a csirkehúst, a paprikát, a paradicsomot, valamint sózzunk, fűszerezzünk. Kb. egy deciliter vizet öntsünk az ételhez, de bánjunk óvatosan a vízzel, mert a csirke főzés közben sok vizet ereszt.
        
        2. Fedő alatt kezdjük el párolni az ételt. A fokhagymát csak a főzés utolsó szakaszában tegyük bele a csirkepaprikásba.
        
        3. Ha a csirkepaprikás megfőtt, akkor keverjük hozzá a tejfölt, de előtte egy kis forró szafttal keverjük simára. Ha a szaftot túl hígnak éreznénk, akkor egy teáskanál keményítőt is keverjünk a tejfölhöz, mielőtt az ételbe raknánk.
        `
    },
    {
        id: 3,
        name: "Fonott kalács",
        imageUrl: "assets/fonott_kalacs.jpg",
        ingredients: ``,
        instructions: ``
    },
];