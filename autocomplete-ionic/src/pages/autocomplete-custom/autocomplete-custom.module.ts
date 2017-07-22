import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteCustomPage } from './autocomplete-custom';
import { AutocompleteModule } from '../../autocomplete-ionic/index'
import { CustomAutocompleteModule } from '../../components/custom-autocomplete/custom-autocomplete.module';

@NgModule({
  declarations: [
      AutocompleteCustomPage
  ],
  imports: [
    IonicPageModule.forChild(AutocompleteCustomPage),
    AutocompleteModule,
    CustomAutocompleteModule
  ],
})
export class AutocompleteCustomModule {
}
