import { Component, Input } from '@angular/core';
import { CoreTable } from 'app/shared/components/core-table/table';
import { Observable, of } from 'rxjs';
import { delay, exhaustMap, filter, map, tap } from 'rxjs/operators';

export interface Example {
  id: number;
  name: string;
}


@Component({
  selector: 'gv-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.scss']
})
export class ExampleTableComponent extends CoreTable<Example> {
  @Input()
  set examples(examples: Example[]) {
    // sets dataSource on CoreTable
    this.set(examples);
    // keep original data because we're cloning it onNext
    this._examples = examples;
  }
  private _examples: Example[];

  @Input() sticky: boolean;

  offset$: Observable<number>;

  constructor() {
    // column definitions for CoreTable
    super(['id', 'name', 'actions']);
  }

  onInit() {
    this.offset$ = this.viewport.renderedRangeStream.pipe(
      map(() => -this.viewport.getOffsetToRenderedContentStart())
    );

    // fake infinite scroll
    const buffer = 20;
    this.viewport.renderedRangeStream.pipe(
      map(x => {
        return x
      }),
      map(({ end }) => ({ end, data: this.dataSource.allData })),
      filter(({ end, data }) => end + buffer > data.length),

      tap(() => this.pending = true),
      exhaustMap(({ data }) =>
        of([
          ...data,
          ...this._examples.map(d => ({ ...d, id: d.id + data.length }))
        ]).pipe(
          delay(500) // fake api delay
        )
      ),
    ).subscribe(data => {
      this.dataSource.allData = data;
      this.pending = false;
    });
  }
}
