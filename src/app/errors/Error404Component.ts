import { Component } from '@angular/core'

@Component({
  template: `
    <h2 class="errorMessage">Hiba történt, a keresett oldal nem található.</h2>
  `,
  styles: [`
    .errorMessage {
      margin-top:150px;
      text-align: center;
    }`]
})
export class Error404Component{
  constructor() {

  }

}
