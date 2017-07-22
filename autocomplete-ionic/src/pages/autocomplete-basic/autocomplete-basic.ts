import { Component } from '@angular/core';
import { IonicPage, ToastController} from 'ionic-angular';
import { QueryProvider } from '../../lib/query-provider';
import { Helper } from '../../lib/helper';

@IonicPage()
@Component({
  selector: 'page-autocomplete-basic',
  templateUrl: 'autocomplete-basic.html',
})
export class AutocompleteBasicPage {
  private _city: string = "";

  constructor(public toastCtrl: ToastController) {
  }

  get queryCitiesFn() {
    return QueryProvider.queryCitiesFn();
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    let alert = value != this._city;
    this._city = value;
    if (alert) 
      Helper.presentToast(this.toastCtrl, value);
  }
}
