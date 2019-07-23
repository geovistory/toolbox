import { Component, Input, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core';
import { Observable } from 'rxjs';
import { AddListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-temporal-entity-add-list',
  templateUrl: './temporal-entity-add-list.component.html',
  styleUrls: ['./temporal-entity-add-list.component.scss']
})
export class TemporalEntityAddListComponent implements OnInit, AddListComponentInterface {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Input() appContext: number

  items$: Observable<TemporalEntityItem[]>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeAlternativeTemporalEntityList(this.listDefinition, this.pkEntity, this.appContext)
    this.itemsCount$ = this.items$.map(i => (i ||  []).length)
  }

}
