import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pages: { title: string, page: string }[] =
  [
    { title: "Basic Autocomplete", page: "AutocompleteBasicPage" },
    { title: "Autocomplete with Complex Datatype", page: "AutocompleteComplexPage" },
    { title: "Autocomplete with Customised Popup", page: "AutocompleteCustomPage" },
    { title: "Async Autocomplete", page: "AutocompleteAsyncPage" },
  ];

  constructor(public navCtrl: NavController) {
  }

  launch(pageName: string) {
    this.navCtrl.push(pageName);
  }  
}
