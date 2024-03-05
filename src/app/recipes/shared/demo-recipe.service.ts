import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Observable, of } from 'rxjs';
import { IRecipe, IRecipeCategory } from './recipes.model';

@Injectable({
  providedIn: 'root'
})
export class DemoRecipeService extends RecipeService {

  recipes: IRecipe[] = RECIPES;

  constructor() { super() }  

  override getRecipes(searchTerm?: string | undefined, 
    pageNumber?: number | undefined, pageSize?: number | undefined): Observable<IRecipe[]> {
    return of(this.recipes);
  }
  override getRecipe(id: number): Observable<IRecipe> {
    for(let r of this.recipes) {
      if(r.id == id) return of(r);
    }
    return of();
  }
  override saveRecipe(recipe: IRecipe): Observable<IRecipe> {
    recipe.id = Math.floor(Math.random() * 1000);
    this.recipes.push(recipe);
    return of(recipe);
  }

  override updateRecipe(recipe: IRecipe): Observable<IRecipe> {
    for(let index = 0; index < this.recipes.length; index++) {
      if (this.recipes[index].id == recipe.id) {
        this.recipes[index] = recipe;
        return of(recipe);
      }      
    }        
    return of();
  }

  override deleteRecipe(id: number): Observable<{}> {
    this.recipes.forEach( (recipe, index) => {
      if(recipe.id == id) {
        this.recipes.splice(index, 1);
        console.log("Delete recipe with index " + index);
      }
    });
    return of(this.recipes);
  }
  override initCategories(): void {
      this.categories = CATEGORIES;
  }

}


const CATEGORIES: IRecipeCategory[] = [
        {id: 1, name: "Leves"},
        {id: 2, name: "Főétel"},
        {id: 3, name: "Főzelék"},
        {id: 4, name: "Sütemény"},
        {id: 5, name: "Torta"},
        {id: 6, name: "Saláta"},
        {id: 7, name: "Befőzés"}
];

const RECIPES: IRecipe[] = [
  {
    id: 17,
    name: "Tyúkhúsleves",
    categoryId: 1,
    category: {id: 1, name: "Leves"},
    imageUrl: "assets/husleves.jpg",
    image: "",  
    ingredients: "friss, bőrös tyúkhús\n6 szál sárgarépa\n2 szál petrezselyemgyökér\n1 zellergumó\n1 karalábé\n1 nagy fej vöröshagyma\n1 fej fokhagyma\n1 paradicsom\n1 paprika\n1 csokor petrezselyem és zellerzöld\n4 burgonya\n1 kk egészbors\n1 tk darált kömény\n1 késhegynyi kurkuma\n2 ek só",
    instructions: "A húst egy nagyobb fazékba téve felöntjük annyi hideg vízzel, hogy bőven ellepje (kb 6 liter) és felforraljuk.\n\nA keletkezett habot kis szűrővel leszedegetjük és beletesszük a megtisztított, feldarabolt zöldségeket és a fűszereket.\n\nNagyon lassú lángon épp csak gyöngyözzön, legalább 3 órán át főzzük. Közben kóstolgatunk, ha íztelen, sózzuk.\n\nMiután elkészült leszűrjük, a főtt húsokat és a zöldségeket külön tálcára szedegetjük és ízlés szerint grízgaluskával vagy cérnametélttel tálaljuk.\n\nJó étvágyat kívánok!"    
  },  
  {
    id: 15,
    name: "Csirkepaprikás",
    categoryId: 2,
    category: {id: 2, name: "Főétel"},
    imageUrl: "assets/csirkepaprikas.jpg",
    image: "",    
    ingredients: "2 evőkanál (liba vagy más) zsír\n10 dkg füstölt szalonna felvágva\n1,5 kg csirkehús\n30 dkg vöröshagyma feldarabolva\n5 gerezd fokhagyma feldarabolva\n1 közepes paradicsom feldarabolva\n1 tv paprika feldarabolva\n1,5 liter alaplé vagy víz\n3 púpozott teáskanál édesnemes pirospaprika\nízlés szerint só\n2 evőkanál tejföl vagy felesben tejszín\n1 teáskanál liszt",
    instructions: "A szalonna csíkokat kevés zsiradék hozzáadásával szép ropogósra sütjük. A megsült szalonna darabokat kivesszük az edényből.\n\nA kisülő zsírra rátesszük a sózott, borsozott csirkedarabokat, majd jól jól körbe pirítjuk.\n\nA megpirult csirkedarabokat kivesszük az edényből. Ha kell, teszünk még kevés zsiradékot a fazékba, hozzáadjuk az apróra vágott hagymát és a szeletelt fokhagymát és üvegesre pirítjuk.\n\nHozzárakjuk a paradicsomot, paprikát és a törött paprikát. Ekkor felöntjük 2 dl alaplével, zsírjára pirítjuk és újabb 2 dl folyadékkal önjük fel, elkeverjük és belepakoljuk az előpirított csirkerészeket.\n\nFelöntjük újabb 2 dl alaplével és egészen addig pároljuk, míg finoman lepirul a szaft és a hús az edény alján, majd újabb adag (kb 3-4 dl) alaplével öntjük fel a paprikás alapot és lefedve puhára főzzük a csirkét.\n\nA tejfölt és a lisztet habverővel összekeverjük egy tálban, hozzákanalazunk a csirke szaftjából, elkeverjük és az egészet hozzáöntjük a csirkéhez. Állandó keveréssel jól beforraljuk a mártást.\n\nNokedlivel vagy tésztával tálaljuk."
  },
  {
    id: 19,
    name: "Sóskafőzelék",
    categoryId: 3,
    category: {id: 3, name: "Főzelék"},
    imageUrl: "assets/soskafozelek.jpg",
    image: "",    
    "ingredients": "0,5 kg  sóskalevél\ncukorhelyettesítő\nsó\n1 dl tejföl\n1 dl tej\n2 tk keményítő",
    "instructions": "A sóskát alaposan, folyó vízben megtisztítjuk, levelenként  jól átmossuk.\n\nEgy fazékban megfőzzük a friss sóskaleveleket, majd turmixoljuk. Egy lábasban felmelegítjük, és ízesítjük sóval , édesítőszerrel.\n\nKözben a tejfölt a keményítővel és a tejjel simára keverjük, és behabarjuk vele a sóskát.\n\nFőtt krumplival, tükörtojással tálaljuk."  
  },
  {
    "id": 14,
    "name": "Fonott kalács",
    "categoryId": 4,
    category: {id: 4, name: "Sütemény" },
    imageUrl: "assets/fonott_kalacs.jpg",
    image: "",
    "ingredients": "dewdw",
    "instructions": "cwedwc"    
  },
  {
    "id": 22,
    "name": "Bodzafagyi",
    "categoryId": 4,
    category: {id: 4, name: "Sütemény" },
    imageUrl: "assets/bodzafagyi.jpg",
    image: "",
    "ingredients": "12 db Bodzavirág\n1 dl Citromlé\n3 szál Menta\n15 dkg Cukor\n2 ek Méz\n6 dl Víz",
    "instructions": "A bodzavirágokat alaposan átnézzük, hogy biztosan nincs-e rajta nem kívánt élősködő, majd egy nagy tálba tesszük.\n\nA bodzához adjuk a karikára vágott citromot és a letépkedett mentaleveleket.\n\nAz egészet nyakon ötjük 6 dl forró vízzel, és egy éjszakán át letakarva állni hagyjuk.\n\nMásnap átszűrjük, és egy edényben közepes lángon melegíteni kezdjük. Hozzáadjuk a cukrot és mézet, majd addig melegítjük, amíg teljesen el nem olvad. Érdemes utána megkóstolni, hogy elég édes-e. Azt vegyünk figyelembe, hogy mivel lefagyasztjuk, így édesebbnek kell lennie, mint egy normál pohár bodzaszörpnek, mert a hideg miatt kevésbé fogjuk élénken érezni az ízeket.\n\nHa elkészült, akkor félretesszük hűlni, és ha már szobahőmérsékletű, akkor a jégkrémformákat megtöltjük a bodzás vízzel, és mélyhűtőbe tesszük."
  },
  {
    "id": 23,
    "name": "Eperkrémes torta",
    "categoryId": 5,    
    category: {id: 5, name: "Torta" },
    imageUrl: "assets/epertorta.jpg",
    image: "",
    "ingredients": "8 tojás\n8 evőkanál kristálycukor\n8 evőkanál liszt\nkéshegynyi szódabikarbóna\n\nA krémhez:\n30 dkg eper\n25 dkg vaj\n25 dkg porcukor\n5 dl tej\n5 evőkanál liszt\n1 evőkanál citromlé\n1 csomag vaníliás cukor\n2 dl habtejszín\n\nA tetejére:\n1 csomag express zselatinfix\nEper szemek\n\nA torta oldala bevonásához:\n2,5 dl habtejszín",
    "instructions": "A piskótalaphoz a tojásokat szétválasztjuk, majd a tojásfehérjét kemény habbá verjük, közben kanalanként hozzáadjuk a cukrot. Ezután jöhet hozzá a tojássárgája, valamint a szódabikarbónával elkevert liszt. A kapott masszát 3 részre osztjuk és külön sütjük meg a lapokat\n\nA krémhez a tűzhelyen felmelegítjük a fél liter tejet, és kézi habverővel, folyamatos kevergetés mellett hozzáadagoljuk a lisztet . Addig kevergetjük, míg jó sűrű masszává nem válik. Ha ez megtörtént, hűlni hagyjuk.\n\nA vajat, a porcukrot, valamint a vaníliás cukrot egy tálban csomómentes krémmé keverjük, majd hozzáadjuk a kihűlt tejes masszát. Az eperből pár szemet félreteszünk a díszítéshez, a többit nagyon apró darabokra vágjuk, és belekeverjük a krémbe, végül hozzákeverjük a citromlét is.\n\nA tejszínt kemény habbá verjük és hozzá keverjük a krémhez.\n\nÖsszeállításkor a krémet 3 részre osztjuk, 1-1 részt rákenünk 1-1 tortalapra. A két tortalapot egymásra tesszük, és befedjük a harmadik tortalappal. A torta oldalát és a tetejét bevonjuk a maradék krémmel.\n\nA tetejét kirakjuk eperrel, majd a zselatinnal leöntjük.\n\nA zselatint a tasakon található használati utasítás szerint oldjuk fel.\n\nA tejszínt kemény habbá verjük és a torta oldalát bevonjuk."
  }
];