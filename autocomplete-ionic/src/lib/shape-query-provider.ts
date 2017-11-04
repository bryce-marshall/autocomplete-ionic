import { QueryFilters } from './query-filters';

export class ShapeQueryProvider {
    public static queryShapesFn(): Function {
        return (filter: string): string[] => {
            return ShapeQueryProvider.queryShapes(filter);
        };
    }

    public static queryShapes(filter: string): string[] {
        return QueryFilters.stringFilter(filter, ShapeQueryProvider.shapes);
    }

    private static get shapes(): string[] {
        return [
            'Circle',
            'Elipse',
            'Octagon',
            'Pentagon',
            'Rectangle',
            'Rhombus',
            'Square',
            'Trapezoid',
            'Triangle',
        ];
    }

}
