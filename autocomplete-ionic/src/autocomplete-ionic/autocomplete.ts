import { ChangeDetectorRef, Directive, ElementRef, HostListener, Optional, Renderer, forwardRef } from '@angular/core';
import { AutocompleteBase, AutocompleteCoordinator } from '@brycemarshall/autocomplete-angular/extend';
import { AutocompleteTypeProvider } from '@brycemarshall/autocomplete-angular';

/**
 * The Autocomplete directive can be applied to an input element to enable auto-complete functionality.
 * @class Autocomplete
 */
@Directive({
    selector: '[autocomp]',
    exportAs: 'autocomp',
})
export class Autocomplete extends AutocompleteBase {
    private inputEl: ElementRef;
    private renderer: Renderer;

    constructor( @Optional() coordinator: AutocompleteCoordinator, @Optional() typeProvider: AutocompleteTypeProvider, renderer: Renderer, ionEl: ElementRef, changeDetectorRef: ChangeDetectorRef) {
        let inputEl = new InputResolvingElementRef(ionEl);
        super(coordinator, typeProvider, inputEl, changeDetectorRef);
        this.inputEl = inputEl;
        this.renderer = renderer;
    }

    protected setControlValue(value: string, persistent: boolean) {
        if (this.inputEl.nativeElement) {
            this.renderer.setElementProperty(this.inputEl.nativeElement, 'value', value);
            if (persistent)
                (<HTMLElement>this.inputEl.nativeElement).dispatchEvent(new Event("input"));
        }
    }

    protected onAfterSetDataItem() {
        if (this.inputEl.nativeElement) {
            this.renderer.setElementProperty(this.inputEl.nativeElement, 'value', this.controlValue);
        }
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
        this.handleFocusEvent(<HTMLInputElement>this.inputEl.nativeElement, event);
    }

    /** @internal */
    @HostListener('ionBlur', ['$event'])
    private onBlur(event: FocusEvent) {
        this.handleBlurEvent(<HTMLInputElement>this.inputEl.nativeElement, event);
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
        if (this.ref.nativeElement == null) return;
        let ch = this.ref.nativeElement.children;
        for (let i = 0; i < ch.length; i++) {
            let n = ch[i];
            if (n.tagName != "INPUT" || n.type != "text") continue;
            this.n = n;
            this.r = true;
            break;
        }
    }
}