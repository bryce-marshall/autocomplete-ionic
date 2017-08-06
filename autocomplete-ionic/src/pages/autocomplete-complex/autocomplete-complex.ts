import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { CurrencyQueryProvider } from '../../lib/currency-query-provider';
import { Helper } from '../../lib/helper';
import { AutocompleteResolveData, AutocompleteQueryMediator, AutocompleteResolveFunction, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-angular';

@IonicPage()
@Component({
  selector: 'page-autocomplete-complex',
  templateUrl: 'autocomplete-complex.html',
})
export class AutocompleteComplexPage {
  private _currency: any = null;

  constructor(private toastCtrl: ToastController) {
  }

  get bindColoursQueryProc(): BindQueryProcessorFunction {
    // Returns a function that the Autocomplete runtime will invoke to bind an active control to a query processor after it has
    // received focus and before its first suggestion query. The same fuction reference will be used until the control loses focus
    // and the AutocompleteQueryMediator is destroyed.
    return (mediator: AutocompleteQueryMediator) => {
      mediator.subscribeFn((sender: AutocompleteQueryMediator, token: any, filter: string) => {
        //  Retrieve the filtered result. Note that result could equally be resolved asynchronously.
        let result = CurrencyQueryProvider.queryCurrencies(filter);
        // Alert the mediator to the result.
        sender.onResult(token, result);
      });
    }
  }

  get currency(): any {
    return this._currency;
  }

  set currency(value: any) {
    let alert = value !== this._currency;
    this._currency = value;
    if (alert)
      Helper.presentToast(this.toastCtrl, value, (v) => {
        if (v == null) return null;
        return 'The currency "' + value.name + '" having the code "' + value.code + '" was selected';
      }
      );
  }

  get currencyCode(): string {
    return this._currency != null ? this._currency.code : "";
  }

  get formatCurrencyFn() {
    return (item: any, descriptive: boolean): string => {
      if (item == null) return "";
      if (descriptive)
        return item.code + " (" + item.name + ")";

      return item.code;
    };
  }

  get resolveFunction(): AutocompleteResolveFunction {
    return (data: AutocompleteResolveData) => {
      let v = data.inputValue.toLowerCase();
      let results = CurrencyQueryProvider.queryCurrencies(v);
      if (results.length == 0) return false;

      for (let c of results) {
        if (c.code.toLowerCase() != v && c.name.toLowerCase() != v) continue;
        data.resolvedValue = c;
        break;
      }
      return data.resolvedValue != null;
    };
  }
}
