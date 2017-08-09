import { Directive, ElementRef } from '@angular/core';
import { AutocompleteStyles as sang } from '@brycemarshall/autocomplete-angular';

/**
 * The AutocompleteStyles directive should be applied to an ng-template element (using the autocomplete-styles selector) immediately below the root application component to declare the default styles for the autocomplete component.
 * 
 * 
 * Example usage: <ng-template autocomplete-styles></ng-template>
 * 
 *  
 * The styles are applied in this manner so as to allow them to be easily overriden at application, page, or component level
 * (which is not possible using encapsulated angular styles without having to use the CSS !important directive).
 * @class AutocompleteStyles
 */
@Directive({
    selector: '[autocomp-styles]'
})
export class AutocompleteStyles {
    constructor(ref: ElementRef) {
        let e = ref.nativeElement;
        if (e != null) {
            e.data = "Base styles for the @brycemarshall/autocomplete-ionic component";
            let n = document.createElement("style");
            n.innerHTML = AutocompleteStyles.getStyleInnerHTML();
            e.parentNode.insertBefore(n, e.nextSibling);
        }
    }

    public static getStyleInnerHTML() {
        return sang.getStyleInnerHTML()
            + "/* Material Design Styles */\r\n"
            + ".md .autocomplete-popup { border: none; min-width: 90%; --trim-below: 24px; --float-above: 20px; --float-below: 14px; background-color: #fafafa;}\r\n"
            + ".md .autocomplete-wrapper { border-radius: 2px; box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4); max-height:inherit; }\r\n"
            + ".md .cancel-icon button { background-color: red; }"
            + "/* iOS Styles */"
            + ".ios .autocomplete-popup { border: none; min-width: 90%; --trim-below: 24px; --float-above: 4px; --float-below: 4px; }"
            + ".ios .autocomplete-wrapper { border: 1px solid #c8c7cc; border-radius: 10px; background-color: #fff; max-height:inherit; }"
            + ".ios .cancel-icon button { background-color: red; border-radius: 2px; }"
            + "/* Windows Platform Styles */"
            + ".wp .autocomplete-popup { border: none; min-width: 90%; --trim-below: 24px; --float-above: 5px; --float-below: 5px; }"
            + ".wp .autocomplete-wrapper { border-radius: 0; background-color: #ffffff; border: 2px solid rgba(0, 0, 0, 0.5); max-height:inherit; }"
            + ".wp .cancel-icon { margin-left: 14px; margin-right: 14px; }  .wp .cancel-icon button { background-color: #488aff; opacity: 1; }";
    }
}
