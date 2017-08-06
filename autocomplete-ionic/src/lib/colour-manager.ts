import { AutocompleteResolveData, AutocompleteResolveFunction, AutocompleteTypeProvider, AutocompleteTypeset } from '@brycemarshall/autocomplete-angular';
import { Colour, ColourQueryProvider } from './colour-query-provider';

export class ColourManager {
    private _colour: Colour = null;
    private _colours: Colour[];

    constructor() {
        this._colours = ColourQueryProvider.queryColours("");
        this.sortColours();
    }

    get colour(): Colour {
        return this._colour;
    }

    set colour(value: Colour) {
        this._colour = value;
    }

    get queryColoursFn() {
        return (filter: string) => {
            return ColourQueryProvider.queryColours(filter, this._colours);
        }
    }

    get resolveColourFn() {
        return (data: AutocompleteResolveData) => {
            let cmpName = data.inputValue.toLowerCase();
            for (let c of this._colours) {
                if (c.name.toLowerCase() != cmpName) continue;
                data.resolvedValue = c;
                break;
            }

            if (data.resolvedValue == null && data.shouldCreate) {
                let rgb: number = data.data;
                if (rgb == null || isNaN(rgb))
                    rgb = Math.floor(Math.random() * 16777215);

                let colour = new Colour(data.inputValue, "#" + rgb.toString(16));
                this._colours = this._colours.concat(colour);
                this.sortColours();
                data.resolvedValue = colour;
            }

            return data.resolvedValue != null;
        }
    }

    nextColour() {
        let idx: number = 0;
        if (this._colour) {
            for (; idx < this._colours.length; idx++) {
                if (this._colours[idx].name != this._colour.name)
                    continue;
                idx++;
                break;
            }
        }

        if (idx >= this._colours.length)
            idx = 0;

        this._colour = this._colours[idx];
    }

    private sortColours() {
        this._colours.sort((a: Colour, b: Colour): number => { return a.name.localeCompare(b.name); })
    }
}