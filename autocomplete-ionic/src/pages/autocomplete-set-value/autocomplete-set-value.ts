import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AutocompleteQueryMediator, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-angular';
import { CityQueryProvider } from '../../lib/city-query-provider';
import { Helper } from '../../lib/helper';

@IonicPage()
@Component({
  selector: 'page-autocomplete-set-value',
  templateUrl: 'autocomplete-set-value.html',
})
export class AutocompleteSetValuePage {
  private _city: string = "";

  constructor(public toastCtrl: ToastController) {
  }

  get bindCitiesQueryProc(): BindQueryProcessorFunction {
    // Returns a function that the Autocomplete runtime will invoke to bind an active control to a query processor after it has
    // received focus and before its first suggestion query. The same fuction reference will be used until the control loses focus
    // and the AutocompleteQueryMediator is destroyed.
    return (mediator: AutocompleteQueryMediator) => {
      mediator.subscribeFn((sender: AutocompleteQueryMediator, token: any, filter: string) => {
        //  Retrieve the filtered result. Note that result could equally be resolved asynchronously.
        let result = CityQueryProvider.queryCities(filter);
        // Alert the mediator to the result.
        sender.onResult(token, result);
      });
    }
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
