import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteBasicPage } from './autocomplete-basic';
import { AutocompleteModule } from '../../autocomplete-ionic/index'

@NgModule({
  declarations: [
      AutocompleteBasicPage
  ],
  imports: [
    IonicPageModule.forChild(AutocompleteBasicPage),
    AutocompleteModule
  ],
//   exports: [
//     AutocompleteBasicPage
//   ]
})
export class AutocompleteBasicModule {
}
