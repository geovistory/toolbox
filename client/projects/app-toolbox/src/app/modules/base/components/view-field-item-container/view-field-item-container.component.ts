import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewFieldTreeNodeService } from '../../services/view-field-tree-node.service';

@Component({
  selector: 'gv-view-field-item-container',
  templateUrl: './view-field-item-container.component.html',
  styleUrls: ['./view-field-item-container.component.scss']
})
export class ViewFieldItemContainerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() treeExtraPl = 80; // add extra padding left if displayMode is 'tree'
  pl$: Observable<number>
  constructor(
    public nodeService: ViewFieldTreeNodeService,
  ) {

  }

  ngOnInit(): void {
    if (this.nodeService.displayMode === 'tree') {
      this.pl$ = this.nodeService.indentation$.pipe(map(indentation => this.treeExtraPl + (indentation * 40)))
    } else {
      this.pl$ = of(16)
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
