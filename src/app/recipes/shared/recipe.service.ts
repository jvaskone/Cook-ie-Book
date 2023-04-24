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

    getCategories(): string[] {
        return CATEGORIES;
    }

    getRecipe(id: number):IRecipe | undefined {
        return RECIPES.find(recipe => recipe.id === id);
    }

    saveRecipe(recipe: IRecipe) {
        recipe.id = 999;
        console.log(recipe);
        RECIPES.push(recipe);
    }
    
}

const CATEGORIES: string[] = [
        "Leves",
        "Főétel",
        "Főzelék",
        "Sütemény",
        "Torta",
        "Saláta",
        "Befőzés"
];

const RECIPES: IRecipe[] = [
    {
        id: 1,
        name: "Húsleves",
        category: "Leves",
        imageUrl: "assets/husleves.jpg",
        ingredients: 
`csirkehús
1 közepes fej vöröshagyma
3 gerezd fokhagyma
3-4 szál zellerzöld
1 csokor petrezselyem
5 nagyobb sárgarépa
5 kisebb fehérrépa
½ zellergumó
½ karalábé
¼ káposzta
2 teáskanál egész feketebors
1 teáskanál darált kömény
késhegynyi kurkuma
`,
        instructions: 
`1. Egy nagy fazékba beletesszük a húsokat. Felöntjük annyi hideg vízzel, hogy bőven ellepje.
2. Egészben beletesszük a vöröshagymát és a fokhagyma gerezdeket, valamint a sót, borsot, zellerzöldet, petrezselymet.
3. Közepes lángon főzzük, mikor hab jelenik meg a tetején, azt egy szűrővel leszedjük róla.
4. Miután lehaboztuk, alacsony lángon főzzük tovább, hogy a leves ne felforrjon, hanem csak gyöngyözzön, ettől lesz szép tiszta. A sárgarépát, a fehérrépát, a káposztát egyben beletesszük a levesbe. Menjen bele a zellergumó is vastagabb cikkekre darabolva.
   A húslevest ne kevergessük, csak hagyjuk magában főni. Viszont gyakran kóstoljuk meg, hogy kíván-e még sót.
   A húsleves elkészültét ne siettessük, a titok a lassú főlésben rejlik. A hozzávalókból ugyanis így tudjuk kinyerni a legtöbb ízt.
5. Nézzük meg, hogy a zöldségek puhára főttek-e. Ha igen, zárjuk le a lángot és hagyjuk pihenni kb. 10 percig a levest, hogy a benne úszkáló zöldség- és húsdarabok leülepedjenek az aljára.
   Ezután szűrjük át egy másik edénybe, a húst és a zöldségeket pedig kiszedhetjük belőle külön tányérokra, hogy a leves mellé tálalni tudjuk. Fontos, hogy ügyeljünk arra, hogy a leves ilyenkor se keveredjen fel.
6. A húsleves tiszta levét zöldségek, húsdarabok és tészta nélkül le is fagyaszthatjuk, hogy aztán később alapléként leveskocka helyett használjuk fel más ételek elkészítéséhez.`
    },
    {
        id: 2,
        name: "Csirkepaprikás",
        category: "Főétel",
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
        category: "Sütemény",
        imageUrl: "assets/fonott_kalacs.jpg",
        ingredients: 
`50 dkg liszt
0,5 kk só
2,5 dkg friss élesztő
2 dl tej
2 ek cukor
1 tasak vaníliás cukor
1 egész tojás
10 dkg vaj`,
        instructions: 
`Az élesztőt belemorzsoljuk a meleg, de nem forró tejbe és meghintjük 1 ek cukorral. Hagyjuk felfutni. Közben egy tálba szitáljuk a lisztet, beleszórjuk a sót, amit egy kevés liszttel betakarunk, hogy ne érintkezzen, majd közvetlenül az élesztővel. Hozzáadjuk a maradék cukrot, a vaníliás cukrot, a margarint és a tojások sárgáját. Alaposan kidagasztjuk.
Meleg helyen, letakarva kb 1 óra alatt a duplájára kelesztjük.

A megkelt tésztát 2 egyenlő nagyságú darabra vágjuk. Egy darabot 3 részre vágunk, ezekből hosszú, hüvelykujjnyi vastag rudakat sodrunk. A három rúd végeit összefogjuk, összecsípjük, majd hármas fonással, nem túl szorosan összefonjuk. A fonás végét is összecsípjük. Koszorúformára hajtjuk és szépen összeigazítjuk a végeket. A másik darab tésztával is elvégezzük a formázást.

Sütőpapírral bélelt tepsibe emeljük és letakarva hagyjuk további 35 percet kelni. Előmelegítjük a sütőt. A megkelt tésztát vékonyan lekenjük egy tojás sárgája és egy kevés tej keverékével.

180 fokon 25 perc alatt alul-felül sütéssel megsütjük. Rácson hagyjuk kihűlni.`
    },
];