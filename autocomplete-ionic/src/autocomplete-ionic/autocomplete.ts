import { ChangeDetectorRef, Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { AutocompleteBase, AutocompleteCoordinator } from '@brycemarshall/autocomplete-angular/extend';
import { AutocompleteTypeProvider } from '@brycemarshall/autocomplete-angular';

/**
 * The Autocomplete directive can be applied to an input element to enable auto-complete functionality.
 * @class Autocomplete
 */
@Directive({
    selector: '[autocomp]',
    exportAs: 'autocomp'
})
export class Autocomplete extends AutocompleteBase {
    private ionEl: ElementRef;
    private inputEl: ElementRef;

    constructor( @Optional() coordinator: AutocompleteCoordinator, @Optional() typeProvider: AutocompleteTypeProvider, ionEl: ElementRef, changeDetectorRef: ChangeDetectorRef) {
        let inputEl = new InputResolvingElementRef(ionEl);
        super(coordinator, typeProvider, inputEl, changeDetectorRef);
        this.ionEl = ionEl;
        this.inputEl = inputEl;
    }

    protected setControlValue(value: string) {
        this.inputEl.nativeElement.value = value;
    }

    protected addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
        this.inputEl.nativeElement.addEventListener(type, listener, useCapture);
    }

    protected removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void {
        this.inputEl.nativeElement.removeEventListener(type, listener, useCapture);
    }

    /** @internal */
    @HostListener('keyup', ['$event'])
    private onKeyUp(event: KeyboardEvent) {
        this.handleKeyUpEvent(<HTMLInputElement>event.target, event);
    }

    /** @internal */
    @HostListener('input', ['$event'])
    private onInput(event: Event) {
        this.handleInputEvent(<HTMLInputElement>event.target, event);
    }

    /** @internal */
    @HostListener('ionFocus', ['$event'])
    private onFocus(event: FocusEvent) {
        // The setControlValue invocation is necessary because Ionic appears to maintain a shadow element or buffer that repopulates 
        // the input text-box with the last typed value upon it receiving focus. This issue relates back to Angular's (at the time of development)
        // inability to allow a forced refresh of UI components (necessary in this case following a cancelled edit where the underlying 
        // model did not change but the input element is out of sync with it). 
        this.setControlValue(this.controlValue);
        this.handleFocusEvent(<HTMLInputElement>this.inputEl.nativeElement, event);
    }

    /** @internal */
    @HostListener('ionBlur', ['$event'])
    private onBlur(event: FocusEvent) {
        this.handleBlurEvent(<HTMLInputElement>this.inputEl.nativeElement, event);
    }

    private onAfterDestroyPopup() {
        // See comments for onFocus method
        this.setControlValue(this.controlValue);
    }
}

class InputResolvingElementRef implements ElementRef {
    private r: boolean = false;
    private n: any;

    constructor(private ref: ElementRef) {
    }

    get nativeElement(): any {
        if (!this.r)
            this.resolveInputEl();

        return this.n;
    }

    private resolveInputEl(): ElementRef {
        this.r = true;
        if (this.ref.nativeElement == null) return;
        let ch = this.ref.nativeElement.children;
        for (let i = 0; i < ch.length; i++) {
            let n = ch[i];
            if (n.tagName != "INPUT" || n.type != "text") continue;
            this.n = n;
            break;
        }
    }
}