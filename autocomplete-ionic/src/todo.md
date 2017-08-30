
1.  Look into Ionic CustomValueAccessor for assigning selected Autocomplete value to ion-input control value (for validation, etc).
    https://github.com/ionic-team/ionic/issues/6580

    The current workaround is to use assign the Autocomplete controlValue property to the ion-input control value property as follows:

    <ion-input ng-model="accountName" type="text" [(dataItem)]="accountName" formControlName="accountName" [allowCreate]="false" autoAssign="on"
    [autocomp]="bindNameQueryFn" #c1="autocomp" [(value)]="c1.controlValue" [resolveFunction]="resolveFunction"></ion-input>    
