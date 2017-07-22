import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteComplexPage } from './autocomplete-complex';
import { AutocompleteModule } from '../../autocomplete-ionic/index'

@NgModule({
  declarations: [
      AutocompleteComplexPage
  ],
  imports: [
    IonicPageModule.forChild(AutocompleteComplexPage),
    AutocompleteModule
  ],
})
export class AutocompleteComplexModule {
}
