import { QueryList } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';


export async function getFirstElementFormQueryList<M>(queryList: QueryList<M>): Promise<M> {
    return new Promise<M>((resolve, reject) => {
        if (queryList.length > 0) {
            resolve(queryList.first);
        }
        queryList.changes
            .pipe(first((x: QueryList<M>) => x.length > 0))
            .subscribe((items) => {
                resolve(items.first);
            });
    });
}
