import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AutocompleteQueryMediator, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-angular';
import { CityQueryProvider } from '../../lib/city-query-provider';
import { Helper } from '../../lib/helper';
import { CachingQueryProcessor, QueryProcessor } from '../../lib/query-processor';
import { QueryFilters } from '../../lib/query-filters';

@IonicPage()
@Component({
  selector: 'page-autocomplete-async',
  templateUrl: 'autocomplete-async.html',
})
export class AutocompleteAsyncPage {
  private _queryProc: QueryProcessor<string>;  
  private _city: string = "";

  constructor(public toastCtrl: ToastController) {
    this._queryProc = new CachingQueryProcessor<string>(() => {
      return Promise.resolve(CityQueryProvider.queryCities(""));
    }, QueryFilters.stringFilter, true);
    // this._queryProc = new QueryProcessor<string>((filter: string) => {
    //   return Promise.resolve(CityQueryProvider.queryCities(filter));
    // });        
  }

  get bindCitiesQueryProc(): BindQueryProcessorFunction {
    return this._queryProc.bindFunction;
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
