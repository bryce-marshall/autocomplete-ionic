import { AutocompleteQueryMediator, AutocompleteQueryProcessor, BindQueryProcessorFunction } from '../autocomplete-ionic';
import { ExceptionFactory } from '@brycemarshall/exception';

interface QueryProcImp extends AutocompleteQueryProcessor {
    bind(mediator: AutocompleteQueryMediator): void;
}
/**
 * QueryProcessor simplifies the process of asynchronously retrieving data for an Autocomplete control.
 */
export class QueryProcessor<T> {
    private _proc: QueryProcImp;

    constructor(queryFn: (filter: string) => Promise<T[]>, destroyFn?: () => void) {
        if (queryFn == null) throw ExceptionFactory.ArgumentNull("fetchFn");

        let that = this;
        let isBound: boolean = false;
        this._proc = {
            onInputChanged(sender: AutocompleteQueryMediator, token: any, filter: string) {
                queryFn(filter).then((result: T[]) => { sender.onResult(token, result); }).catch(() => { sender.onResult(token, null); });
            },
            onDestroy() {
                isBound = false;
                if (destroyFn != null)
                    destroyFn();
            },
            bind(mediator: AutocompleteQueryMediator): void {
                if (isBound) throw ExceptionFactory.InvalidOperation("The query processor is already bound to a mediator.");
                isBound = true;
                mediator.subscribeProc(that._proc);
            }
        };
    }

    get bindFunction(): BindQueryProcessorFunction {
        return (mediator: AutocompleteQueryMediator) => {
            this._proc.bind(mediator);
        };
    }
}

/**
 * CachingQueryProcessor asynchronously prefetches a dataset, and then provides filtered Autocomplete content from the dataset using a filter function.
 */
export class CachingQueryProcessor<T> extends QueryProcessor<T> {
    private _cached: T[] = null;

    constructor(fetchFn: () => Promise<T[]>, filterFn: (filter: string, data: T[]) => T[], autoReset?: boolean) {
        super(
            (filter: string): Promise<T[]> => {
                if (this._cached != null)
                    return Promise.resolve(filterFn(filter, this._cached));

                return fetchFn().then((result) => { this._cached = result; return Promise.resolve(filterFn(filter, this._cached)); });
            },
            () => {
                if (autoReset)
                    this._cached = null;
            }
        );

        if (fetchFn == null) throw ExceptionFactory.ArgumentNull("fetchFn");
        if (filterFn == null) throw ExceptionFactory.ArgumentNull("filterFn");
    }

    reset() {
        this._cached = null;
    }
}

