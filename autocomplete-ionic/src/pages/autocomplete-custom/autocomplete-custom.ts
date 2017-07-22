import { Component } from '@angular/core';
import { IonicPage, ToastController} from 'ionic-angular';
import { QueryProvider } from '../../lib/query-provider';
import { Helper } from '../../lib/helper';
import { AutocompleteResolveData, AutocompleteResolveFunction, AutocompleteTypeProvider, AutocompleteTypeset } from '../../autocomplete-ionic/index';
import { CustomCreate, CustomList } from '../../components/custom-autocomplete/custom-autocomplete.module';
import { Colour, ColourManager } from '../../lib/colour-manager';

@IonicPage()
@Component({
  selector: 'page-autocomplete-custom',
  templateUrl: 'autocomplete-custom.html',
  providers: [AutocompleteTypeProvider]
})
export class AutocompleteCustomPage {
  private _colourManager: ColourManager = new ColourManager();

  constructor(typeProvider: AutocompleteTypeProvider, public toastCtrl: ToastController) {
    typeProvider.add("", new AutocompleteTypeset(CustomCreate, CustomList));
  }

  get queryFn() {
    return this._colourManager.queryColoursFn;
  }

  get resolveFn() {
    return this._colourManager.resolveColourFn;
  }  

  get colour(): Colour {
    return this._colourManager.colour;
  }

  set colour(value: Colour) {
    let alert = value != this._colourManager.colour;
    this._colourManager.colour = value;
    if (alert)
      Helper.presentToast(this.toastCtrl, value, (v) => {
        if (v == null) return null;
        return 'The colour "' + value.name + '" having the rgb value ' + value.rgb + ' was selected';
      }
      );
  }

  get typeKey(): string {
    return "Custom";
  }  
}