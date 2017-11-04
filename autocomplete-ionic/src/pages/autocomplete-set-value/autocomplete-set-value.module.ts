import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteSetValuePage } from './autocomplete-set-value';
import { AutocompleteModule } from '../../autocomplete-ionic/autocomplete-ionic.module';

@NgModule({
  declarations: [
    AutocompleteSetValuePage
  ],
  imports: [
    AutocompleteModule,
    IonicPageModule.forChild(AutocompleteSetValuePage)
  ]
})
export class AutocompleteSetValueModule {
}
