import { Component, OnInit, Input } from '@angular/core';
import { ListDefinition, EntityPreviewItem, RoleItemBasics } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { Observable, Subject } from '../../../../../../node_modules/rxjs';
import { ActiveProjectService, U, InfRole } from '../../../../core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';
import { InfActions } from '../../../../core/inf/inf.actions';
import { first, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { MatCheckboxChange } from '../../../../../../node_modules/@angular/material';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';

@Component({
  selector: 'gv-entity-preview-add-list',
  templateUrl: './entity-preview-add-list.component.html',
  styleUrls: ['./entity-preview-add-list.component.scss']
})
export class EntityPreviewAddListComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  items$: Observable<EntityPreviewItem[]>
  itemsCount$: Observable<number>

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<InfRole>(this.allowMultiSelect, this.initialSelection);

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeAlternativeEntityPreviewList(this.listDefinition, this.pkEntity)
    this.itemsCount$ = this.items$.map(i => (i || []).length)
  }

  addRoles() {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.role.upsert(this.selection.selected, pkProject)
      .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
        this.t.showControl$.next(null)
      })
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
