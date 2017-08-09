import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteBasicPage } from './autocomplete-basic';
import { AutocompleteModule } from '../../autocomplete-ionic/autocomplete-ionic.module';

@NgModule({
  declarations: [
      AutocompleteBasicPage
  ],
  imports: [
    AutocompleteModule,
    IonicPageModule.forChild(AutocompleteBasicPage)
  ]
})
export class AutocompleteBasicModule {
}
