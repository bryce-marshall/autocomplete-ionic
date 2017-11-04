import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteAsyncPage } from './autocomplete-async';
import { AutocompleteModule } from '../../autocomplete-ionic/autocomplete-ionic.module';

@NgModule({
  declarations: [
      AutocompleteAsyncPage
  ],
  imports: [
    AutocompleteModule,
    IonicPageModule.forChild(AutocompleteAsyncPage)
  ]
})
export class AutocompleteBasicModule {
}
