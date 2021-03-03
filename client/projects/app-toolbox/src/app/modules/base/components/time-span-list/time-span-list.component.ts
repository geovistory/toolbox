import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { InformationPipesService, Subfield, TimeSpanItem } from '@kleiolab/lib-queries';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeSpanService } from '../../services/time-span.service';

@Component({
  selector: 'gv-time-span-list',
  templateUrl: './time-span-list.component.html',
  styleUrls: ['./time-span-list.component.scss']
})
export class TimeSpanListComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() treeControl: NestedTreeControl<Subfield>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;


  item$: Observable<TimeSpanItem>
  itemsCount$: Observable<number>

  item: TimeSpanItem
  constructor(
    public p: ActiveProjectService,
    public t: InformationPipesService,
    private timeSpan: TimeSpanService
  ) { }

  ngOnInit() {
    this.item$ = this.t.pipeItemTimeSpan(this.pkEntity)
    this.itemsCount$ = of(1)

    this.item$.pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.item = item
    })
  }

  openModal() {
    // this.timeSpan.openModal(this.item, this.pkEntity)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
