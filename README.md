# @brycemarshall/input-autocomplete-ionic

Attaches Google-style autocomplete behaviour to a standard ion-input control.
The behaviour is implemented as an Angular directive that is applied to the ion-input markup element. 

The component popup can be styled using CSS, and customised using custom create and list sub-components.

See the package type-definition files (including those of the @brycemarshall/autocomplete-angular which this package extends) 
for detailed usage and type documentation.

# Demo (Angular version)

http://plnkr.co/LywhBdi0R4AyXEf5xyHw

# Installation

npm i @brycemarshall/autocomplete-ionic

# Package Exports
The package exports the following types:

``` ts
/**
 * Defines a set of values representing the possible auto-assign modes of an Autocomplete component.
 * When auto-assign is active, changes to the input control do not require explicit acceptance by the user but can instead be
 * automatically applied to the underlying model when the input control loses focus.
 * @enum AutoAssignMode
 */
export declare enum AutoAssignMode {
    /**
     * Only an empty value is automatically applied to the model. This is the default mode.
     */
    Null = 0,
    /**
     * Auto-assign is disabled.
     */
    Off = 1,
    /**
     * Auto-assign is enabled.
     */
    On = 2,
}
/**
 * The structure passed to AutocompleteResolveFunction implementations.
 * @class AutocompleteResolveData
 */
export declare class AutocompleteResolveData {
    /**
     * The value that was entered by the user.
     * @property inputValue
     */
    readonly inputValue: string;
    /**
     * The value of this property will be true if the originating Autocomplete control has its allowCreate property set to true, otherwise it will be false.
     * The property serves as a hint for the implementing resolver function, which should always try to resolve an existing item that can be exactly mapped
     * to the input value. If an existing item cannot be resolved, then the implementing function should not create a new one unless this property has a value of true.
     * @property shouldCreate
     */
    readonly shouldCreate: boolean;
    /**
     * Additional data optionally passed by a custom create component and which may be used by the implementing resolver function to create a new data item.
     * @property data
     */
    readonly data: any;
    /**
     * The resolved data to be assigned to the underlying model by the originating Autocomplete instance.
     * This property should be assigned by the implenting resolver function.
     * @property resolvedValue
     */
    resolvedValue: any;
}
/**
 * A reference to the function invoked by Autocomplete instances to resolve a data item when raw input text (as opposed to an item from the popup suggestion list) is selected by the user.
 * @function AutocompleteResolveFunction
 * @param {AutocompleteResolveData} data
 * @returns Returns true if the implementing function was able to resolve a value, otherwise returns false.
 */
export declare type AutocompleteResolveFunction = (data: AutocompleteResolveData) => boolean;
/**
 * Gets the display text for the specified item.
 * @function getDisplayText
 * @param {any} item The data item from which to derive the display text.
 * @param {boolean} descriptive If true, indicates that (where applicable) descriptive text is required. If false, simple text is returned.
 * Descriptive text is displayed in the list of suggested items, whereas simple text should be displayed in the input control.
 */
export declare type AutocompleteTextFunction = (item: any, descriptive: boolean) => string;
/**
 * An internal class used to coordinate Autocomplete components.
 * @class AutocompleteCoordinator
 */
export declare abstract class AutocompleteCoordinator {
}
/**
 * All input elements having an Autocomplete directive applied to them must be the child of a parent element having an AutocompleteContainer directive.
 * The AutocompleteContainer element becomes the parent element for the Autocomplete popup component. Multiple Autocomplete input element instances
 * can share a single AutocompleteContainer.
 * @class AutocompleteContainer
 */
export declare class AutocompleteContainer {
    constructor(coordinator: AutocompleteCoordinator, ref: ViewContainerRef);
}
/**
 * The base class that should be extended to implement a functional Autocomplete directive which can then be applied to an input element to enable auto-complete functionality.
 *
 * Remarks:
 *
 * The AutocompleteBase type is necessary to enable custom implementations for frameworks that encapsulate the underlying HTMLInput element in a manner that obscures
 * its native interface, including methods necessary for binding to events.
 * @class AutocompleteBase
 */
export declare abstract class AutocompleteBase {
    /**
     * When true, displays the "create" popup subcomponent and allows values that do not appear in the auto-complete suggestion list to be assigned to the model.
     * The default value is true.
     * @property {boolean} allowCreate
     */
    allowCreate: boolean;
    /**
     * Specifies how the control will handle automatic assignent of input values (as opposed to assignment of an item explictly selected from the popup suggestion list).
     * Valid values are "null", "on", and "off" (see also the AutoAssignMode enum).
     * The default value is "null".
     * @property autoAssign
     */
    autoAssign: string;
    /**
     * When true, allows the scrolling through and preselection of list items using the arrow keys.
     * The default value is true.
     * @property allowCursor
     */
    allowCursor: boolean;
    /**
     * When true, the auto-complete popup will automatically open when the input control receives focus.
     * When false, the popup will open only after the input control value has changed.
     * The default value is true.
     * @property {boolean} openOnFocus -
     */
    openOnFocus: boolean;
    /**
     * An optional key used to resolve custom sub-component types from an AutocompleteTypeProvider.
     * @property {string} typeKey
     */
    typeKey: string;
    /**
     * The query function used to resolve the set of auto-complete suggestions. This value is assigned directly to the [autocomp] selector in the template markup.
     * @property {AutocompleteQueryFunction} queryFunction
     */
    queryFunction: BindQueryProcessorFunction;
    /**
     * A reference to a AutocompleteTextFunction that can be used by Autocomplete instances to resolve the display text for data item instances. If not assigned, then the Autocomplete instance will use each data item instance's toString() function.
     * @property {AutocompleteTextFunction} textFunction
     */
    textFunction: AutocompleteTextFunction;
    /**
     * A reference to the function to be invoked to resolve a data item when raw input text (as opposed to an item from the popup suggestion list) is selected by the user.
     * @property {AutocompleteResolveFunction} resolveFunction
     */
    resolveFunction: AutocompleteResolveFunction;
    /**
     * The EventEmitter used to enable two-way data-binding.
     * @property {EventEmitter} dataItemChange
     */
    dataItemChange: EventEmitter<{}>;
    /**
     * Specifies how the control will handle automatic assignent of input values (as opposed to assignment of an item explictly selected from the popup suggestion list).
     * Valid values are AutoAssignMode.Null, AutoAssignMode.On, and AutoAssignMode.Off (see also the AutoAssignMode enum).
     * The default value is AutoAssignMode.Null.
     * @property autoAssignType
     */
    autoAssignType: AutoAssignMode;
    /**
     * Specifies whether or not the popup should automatically close when the bound input control loses focus.
     * The default value is true.
     *
     *
     * Remarks:
     *
     * This feature exists primarily as a development and design aid, as it enables inspection of the popup and its associated CSS styles in the live DOM (which is not otherwise possible as it is disposed of when the input control loses focus).
     * @property closeOnBlur
     */
    closeOnBlur: boolean;
    /** @internal */
    private _dataItem;
    /** @internal */
    private _coordinator;
    /** @internal */
    private _inputRef;
    constructor(coordinator: AutocompleteCoordinator, typeProvider: AutocompleteTypeProvider, inputEl: ElementRef, changeDetectorRef: ChangeDetectorRef);
    /**
     * @property {any} dataItem - Gets or sets the bound data item.
     */
    dataItem: any;
    /**
     * @property {string} controlValue - Returns the value that should be applied to the associated input control.
     * This property is a useful way of applying assigning the value to the DOM input element in the template markup (necessary because it is the dataItem property that
     * is actually bound to the model). Internally, the controlValue getter simply invokes "this.getDisplayText(this.dataItem, false)".
     */
    readonly controlValue: string;
    /**
     * @function getDisplayText - Gets the display text for the specified item using the specified AutocompleteTextFunction if one exists, otherwise dataItem.toString().
     * @param item - The data item to derive the display text from.
     * @param descriptive - If true, indicates that (where applicable) descriptive text is required. If false, simple text is returned.
     * Where applicable, descriptive text is displayed in list of suggested items, whereas simple text is displayed in the input control.
     */
    getDisplayText(dataItem: any, descriptive: boolean): string;
    protected handleKeyUpEvent(src: HTMLInputElement, event: KeyboardEvent): void;
    protected handleInputEvent(src: HTMLInputElement, event: Event): void;
    protected handleFocusEvent(src: HTMLInputElement, event: FocusEvent): void;
    protected handleBlurEvent(src: HTMLInputElement, event: FocusEvent): void;
    /**
     * When implemented in a derived class, sets the textual value of the underlying input control to the value provided.
     *
     * Remarks:
     *
     * This hack is necessary because Angular does not currently provide a way to force the re-rendering of the view (whether a portion of it or in its entirety).
     * Autocomplete requires such functionality because, upon the cancel icon being clicked, although the model won't have changed the text "value" of the bound HTMLInput control will have.
     * This happens because the model is bound to the dataItem property and not the HTMLInput control itself.
     * @method setControlValue
     * @param value The textual value to assign to the native input control.
     */
    protected abstract setControlValue(value: string): any;
    protected abstract addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    protected abstract removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

/**
 * The Autocomplete directive can be applied to an input element to enable auto-complete functionality.
 * @class Autocomplete
 */
export declare class Autocomplete extends AutocompleteBase {
    private ionEl;
    private inputEl;
    constructor(coordinator: AutocompleteCoordinator, typeProvider: AutocompleteTypeProvider, ionEl: ElementRef, changeDetectorRef: ChangeDetectorRef);
    protected setControlValue(value: string): void;
    protected addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    protected removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    /** @internal */
    private onKeyUp(event);
    /** @internal */
    private onInput(event);
    /** @internal */
    private onFocus(event);
    /** @internal */
    private onBlur(event);
    private onAfterDestroyPopup();
}

/**
 * A function that is assigned to an Autocomplete directive instance (via its associated input control) to bind a query processor
 * to the active AutocompleteQueryMediator instance.
 *
 * Remarks:
 *
 * The Observer-type pattern inherent in the BindQueryProcessorFunction design was chosen (as opposed to a function to be invoked each time the
 * Autocomplete input changed) because it gives query implementors greater flexibility when managing the scope and lifecycle of underlying query resources
 * (see also the documentation for the AutocompleteQueryMediator interface).
 * @type BindQueryProcessorFunction
 */
export declare type BindQueryProcessorFunction = (mediator: AutocompleteQueryMediator) => void;
/**
 *
 * @type InputChangedFunction
 */
export declare type InputChangedFunction = (sender: AutocompleteQueryMediator, token: any, filter: string) => void;
/**
 * Implements input state change and lifecycle management methods for an object that performs autocomplete queries
 * (see also the documentation for the AutocompleteQueryMediator interface).
 * @interface AutocompleteQueryProcessor
 */
export interface AutocompleteQueryProcessor {
    /**
     * Invoked by the Autocomplete framework in response to changes to the underlying input control.
     * In response, the query processor implementation should (either synchronously or asynchronously) initiate a query for autocomplete suggestion items,
     * and update the Autocomplete control by invoking sender.updateResult(items).
     *
     * Note: The sender parameter is passed to the onInputChanged method as a convenience (doing so means that it is not necessary for client code to
     * maintain AutocompleteQueryMediator state) however the same AutocompleteQueryMediator instance will first have been passed to the
     * Autocomplete instance's associated BindQueryProcessorFunction.
     */
    onInputChanged(sender: AutocompleteQueryMediator, token: any, filter: string): any;
    /**
     * Invoked by the Autocomplete framework when auto-complete resources are being released from the active input control (which typically occurs when it loses focus).
     * This method provides an opportunity for a query processor to release any of its own open resources.
     */
    onDestroy(): any;
}
/**
 * Mediates interaction between the Autocomplete input control and the query processor that retrieves its dynamic list of auto-complete suggestion items.
 * AutocompleteQueryMediator forwards input changes to a registered handler function
 * (or optionally to a registered object implementing the AutocompleteQueryProcessor processor interface),
 * and allows the handler to return the query results in its own time (synchronously or asynchronously).
 *
 * An AutocompleteQueryMediator is created after an Autocomplete input control received focus and immediately before it makes its first query request
 * for auto-complete suggestions, and the same instance is used for all subsequent query requests made by the same control instance before
 * being destroyed when the input control loses focus.
 *
 * Remarks:
 *
 * AutocompleteQueryMediator can be thought to implement a kind of reciprocal observer pattern, with the query processor subscribing to
 * Autocomplete input change events and the Autocomplete framework subscribing to query updates.
 * @interface AutocompleteQueryMediator
 */
export interface AutocompleteQueryMediator {
    /**
     * Returns true if the AutocompleteQueryMediator instance has been destroyed by the Autocomplete resource manager, otherwise returns false.
     */
    readonly isDestroyed: boolean;
    /**
     * Invoked by the Autocomplete input control's associated BindQueryProcessorFunction to subscribe to input changed and (optionally) destroy events
     * via function references.
     *
     * This method will raise an error if either the subcribeFn or the suscbribeProc methods have previously been invoked.
     */
    subscribeFn(inputChangedFn: InputChangedFunction, destroyFn?: Function): any;
    /**
     * Invoked by the Autocomplete input control's associated BindQueryProcessorFunction to subscribe to input changed and destroy events via
     * an object implementing the AutocompleteQueryProcessor interface.
     *
     * This method will raise an error if either the subcribeFn or the suscbribeProc methods have previously been invoked.
     */
    subscribeProc(processor: AutocompleteQueryProcessor): any;
    /**
     * The method invoked by a query processing implementation to update the active Autocomplete control with query results.
     *
     * Remarks:
     *
     * It is not mandatory for onResult to be invoked in response to every input changed event (although the query processor SHOULD
     * pass either a null value or an empty array to indicate an empty result set); a query processor implementation MAY elect to arbitrarily ignore
     * some or all input changes.
     *
     * It is safe to invoke onResult even after the AutocompleteQueryMediator instance has been destroyed as the invocation will simply be ignored.
     */
    onResult(token: any, items: any[]): any;
}

/**
 * A key/value collection of AutocompleteTypeset instances.
 * @class AutocompleteTypeProvider
 */
export declare class AutocompleteTypeProvider {
    private _parent;
    /** @internal */
    private _d;
    /**
     * Creates a new instance of the AutocompleteTypeset class.
     * @constructor
     * The AutocompleteTypeProvider instance defined in a parent scope (if any).
     * @param {AutocompleteTypeProvider} _parent
     */
    constructor(_parent: AutocompleteTypeProvider);
    /**
     * Adds an AutocompleteTypeset instance to the collection.
     * @method add
     * @param {string} key The unique key identifying the AutocompleteTypeset instance within the collection.
     * @param {string} typeset The AutocompleteTypeset instance to add.
     */
    add(key: string, typeset: AutocompleteTypeset): void;
    /**
     * Retrieves an AutocompleteTypeset instance from the collection.
     * @method get
     * @param {string} key The unique key identifying the AutocompleteTypeset instance to retrieve.
     * @returns The resolved AutocompleteTypeset instance.
     * @throws Throws InvalidOperation error if key does not exist within the collection.
     */
    get(key: string): AutocompleteTypeset;
    /**
     * Retrieves an AutocompleteTypeset instance from the collection, or a specified default value if key does not exist.
     * @method get
     * @param {string} key The key uniquely identifying the AutocompleteTypeset instance to retrieve.
     * @param {string} defaultTypeset Optional. The value to return if key does not exist within the collection.
     * @returns The resolved AutocompleteTypeset instance, or defaultTypeset if key does not exist.
     */
    tryGet(key: string, defaultTypeset?: AutocompleteTypeset): AutocompleteTypeset;
    /**
     * Removes the AutocompleteTypeset identified by key from the collection.
     * @method remove
     * @param {string} key The key uniquely identifying the AutocompleteTypeset instance to remove.
     * @returns The removed AutocompleteTypeset instance.
     * @throws Throws InvalidOperation error if key does not exist within the collection.
     */
    remove(key: string): AutocompleteTypeset;
    /**
     * Evaluates whether or not key exists within the collection.
     * @method has
     * @returns The true if key exists within the collection; otherwise returns false.
     */
    has(key: string): boolean;
    /**
     * Evaluates whether or not key exists within this collection or that of a parent scope.
     * @method canResolve
     * @returns The true if key exists within this collection or that of a parent scope; otherwise returns false.
     */
    canResolve(key: string): boolean;
}
/**
 * Exposes custom Autocomplete popup sub-components.
 * @class AutocompleteTypeset
 */
export declare class AutocompleteTypeset {
    /** @internal */
    private _createType;
    /** @internal */
    private _listType;
    /**
     * Creates a new instance of the AutocompleteTypeset class.
     * @constructor
     * @param {any} createType A component type that implements IAutocompleteCreateComponent.
     * Pass null to fallback to that defined by a parent scope (or to the default if no parent definition exists).
     * @param {any} listType A component type that implements IAutocompleteListComponent.
     * Pass null to fallback to that defined by a parent scope (or to the default if no parent definition exists).
     */
    constructor(createType: any, listType: any);
    /**
     * The custom create component type (if any) represented by this instance.
     * @property {any} createType
     */
    readonly createType: any;
    /**
     * The custom list component type (if any) represented by this instance.
     * @property {any} listType
     */
    readonly listType: any;
}
```

# Usage - Applying the CSS Stylesheets

The styles for the autocomplete control are written to the DOM by applying an AutocompleteStyles directive to an ng-template markup element.
This implementation ensures that autocomplete styles can be overridden in standard CSS form at any level in the DOM below the AutocompleteStyles declaration (whether globally, at page level, or within individual components). 

In these examples, the default styles are applied globally in app.html, however they could equally be applied at page level.

```ts
// FILE: src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Import the Autocomplete Javascript module
import { AutocompleteModule } from '@brycemarshall/autocomplete-ionic';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    // Import the Angular Autocomplete module into the NgModule
    AutocompleteModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

``` html
<!-- FILE: src/app/app.html -->
<ng-template autocomp-styles></ng-template>
<ion-nav [root]="rootPage"></ion-nav>
```

# CSS Configuration

The default CSS values are shown below, and may be overridden.

``` scss
.autocomplete-popup
 {
    transform:scale(1);
    z-index:10007;
    background-color: #ffffff;
    border: 1px solid #dedede;
    max-width:100%;
    opacity: 1;
    /* 
    true|false - If true, automatically sets the min-width style property of the popup element to the explicit computed width of the bound active input element.
    The default value is 'true'. 
    */    
    --auto-min-width: true;
    /* 
    The height that will be trimmed off the maximum available popup height when it is displayed in the upper position.
    The popup height will not be trimmed below the specified compression limit.
    */
    --trim-above: 0px;
    /* 
    The height that will be trimmed off the maximum available popup height when it is displayed in the lower position.
    The popup height will not be trimmed below the specified compression limit.
    */
    --trim-below: 0px;
    /* The height that the popup will float above the input when displayed in the upper position  */
    --float-above: 0px;
    /* The height  that the popup will float below the input when displayed in the lower position  */
    --float-below: 0px;
    /* 
    The lowest height that the popup will be compressed to before the lower position loses priority.
    Note that --compression-limit will still be overridden when the available viewport area is too small to contain it,
    unless --compression-limit-override is set to false. The default value is 50%.
    */
    --compression-limit: 50%;
    /* 
    true|false - Enables overriding of the compression limit when the available viewport area is so small that popup would otherwise be forced to extend beyond it */
    --compression-limit-override: true;
    /* 
    The delay, in milliseconds, between the bound input element receiving focus and the popup opening. The default is 700 milliseconds.
    This  can be useful to prevent initial popup jitter and resizing if the UI automatically scrolls the input element 
    into an optimal viewport position upon it receiving focus.
    */
    --open-delay: 700;
    /*
    When specified, defines the duration (in milliseconds) of the minimum enforced delay between each processed scroll event in a sequence.
    The default value  is 150 milliseconds).
    */    
    --scroll-throttle-duration: 150;
    /*
    The text to render in the cancel icon. The default value is 'X'.
    */
    --cancel-text: X;
    /* 
    true|false - If true, automatically sizes the cancel icon in both dimensions to correspond with the height of the active input element
    The default value is 'true'. 
    */
    --auto-size-cancel: true;
    /* 
    The delay, in milliseconds, between the last input element keyup event in any given sequence and the cancel icon appearing. The default is 1000 milliseconds.
    */
    --cancel-delay: 1000;    
}

.autocomplete-wrapper .autocomplete-button {
    text-transform: none;
    display: block;
    padding: 8px 12px;
    text-align: center;
    text-decoration: none;
    background-color: inherit;
    font-size: larger;
    width: 100%;
    border: 0px;
}

.autocomplete-items .autocomplete-button {
    color: royalblue;
    text-align: start;
}

.autocomplete-items .autocomplete-button[autocomplete-cursor] {
    background-color: #e5e5e5;
}

.autocomplete-input
{
    border-bottom: 1px solid #dedede;
}

.autocomplete-items
{
    position: relative;
    overflow: auto;
}

.cancel-icon {
    transform:scale(1);
    z-index:10008;
    width: 25px;
    height: 25px;
}

.cancel-icon button {
    background-color: royalblue;
    opacity: 0.5;
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12px;
    width: inherit;
    height: inherit;
    text-align: center;
    border: none;
}
/* Material Design Styles */
.md .autocomplete-popup { min-width: 90%; --trim-below: 24px; --float-above: 20px; --float-below: 14px; }
.md .autocomplete-popup { background-color: #fafafa; }
.md .autocomplete-wrapper { border-radius: 2px; box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4); max-height:inherit; }


```

# Usage - AutocompleteModule Import

When using Ionic lazy-loading pages (as in the examples below), AutocompleteModule module MUST be imported by EACH PAGE's associated NgModule.

# Usage - Basic

``` html
<!-- FILE: src/pages/autocomplete-basic/autocomplete-basic.html -->
<ion-header>
  <ion-navbar>
    <ion-title>Autocomplete Basic</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding autocomp-container>
  <ion-list>
    <ion-item>
      <ion-label fixed>City</ion-label>
      <ion-input type="text" [(dataItem)]="city" [autocomp]="bindCitiesQueryProc" [allowCreate]="false" autoAssign="null"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>
```

``` ts
// FILE: src/pages/autocomplete-basic/autocomplete-basic.module.ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteBasicPage } from './autocomplete-basic';
// Import the Autocomplete Javascript module
import { AutocompleteModule } from '@brycemarshall/autocomplete-ionic';

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

// FILE: src/pages/autocomplete-basic/autocomplete-basic.ts
import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AutocompleteQueryMediator, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-ionic';
import { CityQueryProvider } from '../../lib/city-query-provider';
import { Helper } from '../../lib/helper';

@IonicPage()
@Component({
  selector: 'page-autocomplete-basic',
  templateUrl: 'autocomplete-basic.html',
})
export class AutocompleteBasicPage {
  private _city: string = "";

  constructor(public toastCtrl: ToastController) {
  }

  get bindCitiesQueryProc(): BindQueryProcessorFunction {
    // Returns a function that the Autocomplete runtime will invoke to bind an active control to a query processor after it has
    // received focus and before its first suggestion query. The same fuction reference will be used until the control loses focus
    // and the AutocompleteQueryMediator is destroyed.
    return (mediator: AutocompleteQueryMediator) => {
      mediator.subscribeFn((sender: AutocompleteQueryMediator, token: any, filter: string) => {
        //  Retrieve the filtered result. Note that result could equally be resolved asynchronously.
        let result = CityQueryProvider.queryCities(filter);
        // Alert the mediator to the result.
        sender.onResult(token, result);
      });
    }
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    let alert = value != this._city;
    this._city = value;
    if (alert)
      Helper.presentToast(this.toastCtrl, value);
  }
}
```

# Usage - Complex Datatype with autoAssign enabled, and using textFunction to format item text

(see also the "Supporting Types for Demos" sections below)

``` html
<!-- FILE: src/pages/autocomplete-complex/autocomplete-complex.html -->
<ion-header>
  <ion-navbar>
    <ion-title>Autocomplete Complex Datatype</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding autocomp-container>
  <ion-list>
    <ion-item>
      <ion-label fixed>Currency</ion-label>
      <ion-input type="text" [(dataItem)]="currency" [allowCreate]="false" autoAssign="on"
      [autocomp]="bindCurrenciesQueryProc" [textFunction]="formatCurrencyFn" [resolveFunction]="resolveFunction"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>
```

``` ts
// FILE: src/pages/autocomplete-complex/autocomplete-complex.module.ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteComplexPage } from './autocomplete-complex';
import { AutocompleteModule } from '@brycemarshall/autocomplete-ionic'

@NgModule({
  declarations: [
      AutocompleteComplexPage
  ],
  imports: [
    AutocompleteModule,
    IonicPageModule.forChild(AutocompleteComplexPage)
  ],
})
export class AutocompleteComplexModule {
}

// FILE: src/pages/autocomplete-complex/autocomplete-complex.ts
import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { CurrencyQueryProvider } from '../../lib/currency-query-provider';
import { Helper } from '../../lib/helper';
import { AutocompleteResolveData, AutocompleteQueryMediator, AutocompleteResolveFunction, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-ionic';

@IonicPage()
@Component({
  selector: 'page-autocomplete-complex',
  templateUrl: 'autocomplete-complex.html',
})
export class AutocompleteComplexPage {
  private _currency: any = null;

  constructor(private toastCtrl: ToastController) {
  }

  get bindCurrenciesQueryProc(): BindQueryProcessorFunction {
    // Returns a function that the Autocomplete runtime will invoke to bind an active control to a query processor after it has
    // received focus and before its first suggestion query. The same fuction reference will be used until the control loses focus
    // and the AutocompleteQueryMediator is destroyed.
    return (mediator: AutocompleteQueryMediator) => {
      mediator.subscribeFn((sender: AutocompleteQueryMediator, token: any, filter: string) => {
        //  Retrieve the filtered result. Note that result could equally be resolved asynchronously.
        let result = CurrencyQueryProvider.queryCurrencies(filter);
        // Alert the mediator to the result.
        sender.onResult(token, result);
      });
    }
  }

  get currency(): any {
    return this._currency;
  }

  set currency(value: any) {
    let alert = value !== this._currency;
    this._currency = value;
    if (alert)
      Helper.presentToast(this.toastCtrl, value, (v) => {
        if (v == null) return null;
        return 'The currency "' + value.name + '" having the code "' + value.code + '" was selected';
      }
      );
  }

  get formatCurrencyFn() {
    return (item: any, descriptive: boolean): string => {
      if (item == null) return "";
      if (descriptive)
        return item.code + " (" + item.name + ")";

      return item.code;
    };
  }

  get resolveFunction(): AutocompleteResolveFunction {
    return (data: AutocompleteResolveData) => {
      let v = data.inputValue.toLowerCase();
      let results = CurrencyQueryProvider.queryCurrencies(v);
      if (results.length == 0) return false;

      for (let c of results) {
        if (c.code.toLowerCase() != v && c.name.toLowerCase() != v) continue;
        data.resolvedValue = c;
        break;
      }
      return data.resolvedValue != null;
    };
  }
}
```

# Usage - Custom Create and List Sub-Components, and with allowCreate enabled

(see also the "Supporting Types for Demos" sections below)

The typeKey attribute is used in the markup to specify the custom AutocompleteTypeset from which the types for this instance are retrieved.

Note that typesets are named, but that it is possible to specify a custom global default typeset by adding a custom typeset to the injected AutocompleteTypeProvider instance using an empty string as the key. If a typeset with the specified key does not exist in the immediate 
injected AutocompleteTypeProvider instance, the autocomplete control will walk the branch of injected parent AutocompleteTypeProvider instances,
and finally throw an error if none can be found.

Note also that when adding a custom AutocompleteTypeset, type values (the custom create type and the custom list type) may be specified as null.
Specifying a null type will result in the autocomplete control falling back upon the default sub-component implementation.

``` html
<!-- FILE: src/pages/autocomplete-custom/autocomplete-custom.html -->
<ion-header>
  <ion-navbar>
    <ion-title>Autocomplete Custom</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding autocomp-container>
  <ion-list>
    <ion-item>
      <ion-label fixed>Colour</ion-label>
      <ion-input type="text" [(dataItem)]="colour" [autocomp]="bindColoursQueryProc" typeKey="CustomColour" [resolveFunction]="resolveColourFn" [allowCreate]="true" autoAssign="on"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>
```

``` ts
// FILE: src/pages/autocomplete-custom/autocomplete-custom.module.ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutocompleteCustomPage } from './autocomplete-custom';
import { AutocompleteModule } from '@brycemarshall/autocomplete-ionic'
import { CustomAutocompleteModule } from '../../components/custom-autocomplete/custom-autocomplete.module';

@NgModule({
  declarations: [
      AutocompleteCustomPage
  ],
  imports: [
    AutocompleteModule,
    CustomAutocompleteModule,
    IonicPageModule.forChild(AutocompleteCustomPage)    
  ],
})
export class AutocompleteCustomModule {
}

// FILE: src/pages/autocomplete-custom/autocomplete-custom.ts
import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { Colour, ColourQueryProvider } from '../../lib/colour-query-provider';
import { Helper } from '../../lib/helper';
import { AutocompleteQueryMediator, AutocompleteResolveData, AutocompleteResolveFunction, AutocompleteTypeProvider, AutocompleteTypeset, BindQueryProcessorFunction } from '@brycemarshall/autocomplete-ionic';
import { CustomCreate, CustomList } from '../../components/custom-autocomplete/custom-autocomplete.module';
import { ColourManager } from '../../lib/colour-manager';

@IonicPage()
@Component({
  selector: 'page-autocomplete-custom',
  templateUrl: 'autocomplete-custom.html',
  providers: [AutocompleteTypeProvider]
})
export class AutocompleteCustomPage {
  private _cman: ColourManager = new ColourManager();

  constructor(typeProvider: AutocompleteTypeProvider, public toastCtrl: ToastController) {
    typeProvider.add("CustomColour", new AutocompleteTypeset(CustomCreate, CustomList));
  }

  get bindColoursQueryProc(): BindQueryProcessorFunction {
    // Returns a function that the Autocomplete runtime will invoke to bind an active control to a query processor after it has
    // received focus and before its first suggestion query. The same fuction reference will be used until the control loses focus
    // and the AutocompleteQueryMediator is destroyed.
    return (mediator: AutocompleteQueryMediator) => {
      mediator.subscribeFn((sender: AutocompleteQueryMediator, token: any, filter: string) => {
        //  Retrieve the filtered result. Note that result could equally be resolved asynchronously.
        let result = this._cman.queryColoursFn(filter);
        // Alert the mediator to the result.
        sender.onResult(token, result);
      });
    }
  }

  get resolveColourFn() {
    // Returns a reference to the function that returns the existing object instance (or creates a new instance) for a specific input control value.
    // See the ColourManager source for an example of how to handle the case where a new object must be created.
    return this._cman.resolveColourFn;
  }

  get colour(): Colour {
    return this._cman.colour;
  }

  set colour(value: Colour) {
    let alert = value != this._cman.colour;
    this._cman.colour = value;
    if (alert)
      Helper.presentToast(this.toastCtrl, value, (v) => {
        if (v == null) return null;
        return 'The colour "' + value.name + '" having the rgb value ' + value.rgb + ' was selected';
      }
      );
  }
}
```

# Supporting Types for Demos - Query Providers

``` ts
// FILE: src/lib/helper.ts
import { ToastController } from 'ionic-angular';

export type MessageFunction = (data: any) => string;

export class Helper {
    static presentToast(toastCtrl: ToastController, data: any, fn?: MessageFunction) {
        if (fn)
            data = fn(data);
        else
            data = data != null && (!data.length || data.length > 0) ? 'The value "' + data + '" was selected' : null;

        toastCtrl.create({
            message: data != null ? data : "A null value was applied",
            duration: 3000
        }).present();
    }
}

// FILE: src/lib/query-filters.ts
export class QueryFilters {
    static stringFilter(filter: string, items: string[]) {
        return QueryFilters.genericFilter((filter: string, item: any, exact: boolean): boolean => {
            if (item == null) return false;
            return exact ? item.toLowerCase() == filter : item.toLowerCase().indexOf(filter) > -1;
        }, filter, items);
    }

    static genericFilter(filterFunction: Function, filter: string, items: any[]) {
        if (filter == null || filter.length == 0) return items;
        filter = filter.toLowerCase();

        let result = items;

        // if the value is an empty string don't filter the items
        if (filter && filter.trim() != '') {
            result = [];
            for (let item of items) {
                if (filterFunction(filter, item, false))
                    result.push(item);
            }
        }

        return result;
    }
}

// FILE: src/lib/city-query-provider.ts
import { QueryFilters } from './query-filters';

export class CityQueryProvider {
    public static queryCitiesFn(): Function {
        return (filter: string): string[] => {
            return CityQueryProvider.queryCities(filter);
        };
    }

    public static queryCities(filter: string): string[] {
        return QueryFilters.stringFilter(filter, CityQueryProvider.cities);
    }

    private static get cities(): string[] {
        return [
            'Amsterdam',
            'Auckland',
            'Bogota',
            'Buenos Aires',
            'Cairo',
            'Canberra',
            'Dhaka',
            'Edinburgh',
            'Geneva',
            'Genoa',
            'Glasglow',
            'Hanoi',
            'Hong Kong',
            'Islamabad',
            'Istanbul',
            'Jakarta',
            'Kiel',
            'Kyoto',
            'Le Havre',
            'Lebanon',
            'Lhasa',
            'Lima',
            'London',
            'Los Angeles',
            'Madrid',
            'Manila',
            'New York',
            'Olympia',
            'Oslo',
            'Panama City',
            'Peking',
            'Philadelphia',
            'San Francisco',
            'Seoul',
            'Sydney',
            'Taipeh',
            'Tel Aviv',
            'Tokio',
            'Uelzen',
            'Washington',
            'Wellington'
        ];
    }
}

// FILE: src/lib/colour-query-provider.ts
import { QueryFilters } from './query-filters';

export class Colour {
    private _name: string;
    private _rgb: string;

    constructor(name: string, rgb: string) {
        this._name = name;
        this._rgb = rgb;
    }

    get name(): string {
        return this._name;
    }

    get rgb(): string {
        return this._rgb;
    }

    toString() {
        return this._name;
    }
}

export class ColourQueryProvider {
    public static queryColoursFn(): Function {
        return (filter: string): Colour[] => {
            return ColourQueryProvider.queryColours(filter);
        };
    }

    public static queryColours(filter: string, colours?: Colour[]): Colour[] {
        if (colours == null)
            colours = ColourQueryProvider.colours;

        return QueryFilters.genericFilter((filter: string, item: Colour, exact: boolean): boolean => {
            if (item == null) return false;
            if (exact)
                return item.name == filter || item.name.toLowerCase() == filter;
            return item.name.toLowerCase().indexOf(filter) > -1 || item.name.toLowerCase().indexOf(filter) > -1;
        }, filter, colours);
    }

    private static get colours(): Colour[] {
        return [
            new Colour('Black', "#000000"),
            new Colour('Blue', "#0000FF"),
            new Colour('Green', "#008000"),
            new Colour('Grey', "#808080"),
            new Colour('Orange', "#FFA500"),
            new Colour('Pink', "#FFC0CB"),
            new Colour('Purple', "#800080"),
            new Colour('Red', "#FF0000"),
            new Colour('White', "#FFFFFF"),
            new Colour('Yellow', "#FFFF00")
        ];
    }
}

// FILE: src/lib/colour-manager.ts
import { AutocompleteResolveData, AutocompleteResolveFunction, AutocompleteTypeProvider, AutocompleteTypeset } from '../autocomplete/index';
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

// FILE: src/lib/currency-query-provider.ts
import { QueryFilters } from './query-filters';

export class CurrencyQueryProvider {

    public static queryCurrenciesFn(): Function {
        return (filter: string): any[] => {
            return CurrencyQueryProvider.queryCurrencies(filter);
        };
    }

    public static queryCurrencies(filter: string): any[] {
        return QueryFilters.genericFilter((filter: string, item: any, exact: boolean): boolean => {
            if (item == null) return false;
            if (exact)
                return item.code.toLowerCase() == filter || item.name == filter;
            return item.code.toLowerCase().indexOf(filter) > -1 || item.name.toLowerCase().indexOf(filter) > -1;
        }, filter, CurrencyQueryProvider.currencies);
    }

    private static get currencies(): any[] {
        let items = JSON.parse(
            '{"AUD":{"name":"Australian Dollar","code":"AUD"},"BRL":{"name":"Brazilian Real","code":"BRL"}, "CAD":{"name":"Canadian Dollar","code":"CAD"}, "CHF":{"name":"Swiss Franc","code":"CHF"},"CNY":{"name":"Chinese Yuan","code":"CNY"},"EUR":{"name":"Euro","code":"EUR"},"GBP":{"name":"British Pound Sterling","code":"GBP"},"HKD":{"name":"Hong Kong Dollar","code":"HKD"},"ILS":{"name":"Israeli New Sheqel","code":"ILS"},"JPY":{"name":"Japanese Yen","code":"JPY"},"KRW":{"name":"South Korean Won","code":"KRW"}, "NZD":{"name":"New Zealand Dollar","code":"NZD"},"SGD":{"name":"Singapore Dollar","code":"SGD"},"USD":{"name":"US Dollar","code":"USD"}}'
        );

        let result = [];
        for (let key in items) {
            result.push(items[key])
        }

        return result;
    }
}
```
# Supporting Types for Demos - Custom Create and List Components

``` ts
// FILE: src/components/custom-autocomplete/custom-autocomplete.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCreate } from './custom-create';
import { CustomList } from './custom-list';
export { CustomCreate } from './custom-create';
export { CustomList } from './custom-list';

@NgModule({
  declarations: [
    CustomCreate,
    CustomList
  ],
  imports: [
    CommonModule
  ],
  entryComponents:[CustomCreate, CustomList],  
  exports: [
    CustomCreate,
    CustomList
  ]
})
export class CustomAutocompleteModule {}

// FILE: src/components/custom-autocomplete/custom-create.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { AutocompleteController, AutocompleteCreateComponent } from '@brycemarshall/autocomplete-angular';

@Component({
  selector: 'custom-create',
  templateUrl: 'custom-create.html',
  styleUrls: ['custom-create.scss'],
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

  getCreateData(): any {
    return this._rgb;
  }

  onCreate() {
    this._controller.resolveAndAssignItem(this.input, this._rgb);
  }

  getBackgroundColor() {
    return "#" + this._rgb.toString(16);
  }
}

// FILE: src/components/custom-autocomplete/custom-list.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { AutocompleteController, AutocompleteListComponent } from '@brycemarshall/autocomplete-angular';

@Component({
    selector: 'custom-list',
    templateUrl: 'custom-list.html',
    styleUrls: ['custom-list.scss'],
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

```

``` scss
/* FILE: src/components/custom-autocomplete/custom-create.scss */
custom-create .swatch {
    width: 12px; 
    height: 12px;
    border: 1px solid black;
}

/* FILE: src/components/custom-autocomplete/custom-list.scss */
custom-list .swatch {
    width: 12px; 
    height: 12px;
    border: 1px solid black;
    float: right;
    margin-right: 12px;    
}

.autocomplete-items td[autocomplete-cursor] {
    background-color: #e5e5e5;
}

```

``` html
<!-- FILE: src/components/custom-autocomplete/custom-create.html -->
<table style="width:100%;border-collapse:collapse;">
    <tr>
        <td style="width:85%">
            <button class="autocomplete-button" (click)="onCreate()">{{input}}</button>
        </td>
        <td style="text-align: right;">
            <div class="swatch" [style.background-color]="getBackgroundColor()"></div>
        </td>
    </tr>
</table>

<!-- FILE: src/components/custom-autocomplete/custom-list.html -->
<table style="width:100%;border-collapse:collapse;" border="0" cellpadding="0">
    <tr *ngFor="let item of items; let i = index">
        <td style="width:85%">
            <button class="autocomplete-button" [attr.autocomplete-cursor]="i == cursor ? true : null" (click)="onSelect(item)">{{getDisplayValue(item)}}</button>
        </td>
        <td style="text-align: right;" [attr.autocomplete-cursor]="i == cursor ? true : null">
            <div class="swatch" [style.background-color]="item.rgb"></div>
        </td>
    </tr>
</table>
```