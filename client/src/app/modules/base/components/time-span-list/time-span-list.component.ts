import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core';
import { Observable, of, Subject } from 'rxjs';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ListDefinition, TimeSpanItem } from '../properties-tree/properties-tree.models';
import { InformationPipesService } from '../../services/information-pipes.service';
import { TimeSpanService } from '../../services/time-span.service';

@Component({
  selector: 'gv-time-span-list',
  templateUrl: './time-span-list.component.html',
  styleUrls: ['./time-span-list.component.scss']
})
export class TimeSpanListComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() treeControl: NestedTreeControl<ListDefinition>;
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
    // this.p.inf$.role$.by_fk_property__fk_temporal_entity$.key('72_300593').pipe(takeUntil(this.destroy$)).subscribe(a=>{

    // })
    this.item$.pipe(takeUntil(this.destroy$)).subscribe(item => {
      this.item = item
    })
  }

  openModal() {
    this.timeSpan.openModal(this.item, this.pkEntity)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
