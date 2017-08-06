import { Component, ViewEncapsulation } from '@angular/core';
import { AutocompleteController, AutocompleteCreateComponent } from '@brycemarshall/autocomplete-angular';

@Component({
  selector: 'custom-create',
  templateUrl: 'custom-create.html',
  //styleUrls: ['custom-create.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomCreate implements AutocompleteCreateComponent {
  private _input: string;
  private _rgb: number = 0;

  constructor(private _controller: AutocompleteController) {
  }

  get input(): string {
    return this._input;
  }

  set input(value: string) {
    this._rgb = Math.floor(Math.random() * 16777215);
    this._input = value;
  }

  getCreateData() {
    return this._rgb;
  }

  onCreate() {
    this._controller.resolveAndAssignItem(this.input, this._rgb);
  }

  getBackgroundColor() {
    return "#" + this._rgb.toString(16);
  }
}
