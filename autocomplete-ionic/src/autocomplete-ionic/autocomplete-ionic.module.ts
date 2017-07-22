import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteStyles } from './autocomplete-styles';
import { AutocompleteContainer } from '@brycemarshall/autocomplete-angular';
import { AutocompletePopup, CreateDirective, ListDirective, CancelIcon } from '@brycemarshall/autocomplete-angular/extend';
import { Autocomplete } from './autocomplete';

@NgModule({
  declarations: [
    //AutocompleteStyles,
    Autocomplete,
    AutocompleteContainer,
    AutocompletePopup, 
    CreateDirective, 
    ListDirective,
    CancelIcon
  ],
  imports: [
    //IonicPageModule.forChild(AutocompleteStyles),
    IonicPageModule.forChild(Autocomplete),
    IonicPageModule.forChild(AutocompleteContainer),
    IonicPageModule.forChild(AutocompletePopup),
    IonicPageModule.forChild(CreateDirective),
    IonicPageModule.forChild(ListDirective),
    IonicPageModule.forChild(CancelIcon),
  ],
  exports: [
    Autocomplete, AutocompleteContainer
  ]
})
export class AutocompleteModule {
}
