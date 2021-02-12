import { Observable } from 'rxjs';
import { Field } from './Field';
import { TemporalEntityItem } from './TemporalEntityItem';
export interface TemporalEntityTableI {
    rows$: Observable<TemporalEntityItem[]>;
    columns$: Observable<Field[]>;
}
