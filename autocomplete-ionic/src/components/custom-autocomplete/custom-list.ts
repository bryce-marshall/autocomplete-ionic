import { Component, ViewEncapsulation } from '@angular/core';
import { AutocompleteController, AutocompleteListComponent } from '@brycemarshall/autocomplete-angular';

@Component({
    selector: 'custom-list',
    templateUrl: 'custom-list.html',
    // styleUrls: ['custom-list.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomList implements AutocompleteListComponent {
    items: any[];

    text: string;

    constructor(private _controller: AutocompleteController) {
    }

    onSelect(item: any) {
        this._controller.assignItem(item);
    }

    getDisplayValue(item: any): string {
        return this._controller.getDisplayText(item, true);
    }

    get cursor(): number {
        return this._controller.cursor;
    }
}
