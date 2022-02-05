import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { ViewFieldDropListService } from '../../services/view-field-drop-list.service';
import { ViewFieldTreeNodeService } from '../../services/view-field-tree-node.service';

@Component({
  selector: 'gv-view-field-empty-drop-list',
  templateUrl: './view-field-empty-drop-list.component.html',
  styleUrls: ['./view-field-empty-drop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldDropListService,
    ViewFieldTreeNodeService,
  ]
})
export class ViewFieldEmptyDropListComponent implements OnInit {
  @Input() field: Field
  @Input() source: GvFieldSourceEntity;
  @Input() scope: GvFieldPageScope


  constructor(
    public viewFieldDropListService: ViewFieldDropListService,
    public treeNodeService: ViewFieldTreeNodeService,
  ) {
    treeNodeService.indentation$.next(treeNodeService.indentation$.value)
  }

  ngOnInit(): void {

    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.field) errors.push('@Input() field is required.');
    if (errors.length) throw new Error(errors.join('\n'));

  }

}
