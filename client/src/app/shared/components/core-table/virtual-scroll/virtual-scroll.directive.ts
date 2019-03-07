import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ContentChild,
  Directive,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { MatTable } from '@angular/material';
import { Subscription } from 'rxjs';
import { CoreTableDataSource } from '../data-source';
import { CoreTableVirtualScrollStrategy } from './virtual-scroll.strategy';

@Directive({
  selector: 'cdk-virtual-scroll-viewport[coreTableVirtualScroll]',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: (scroll: CoreTableFixedVirtualScrollDirective) => scroll.scrollStrategy,
      deps: [forwardRef(() => CoreTableFixedVirtualScrollDirective)],
    },
  ],
})
export class CoreTableFixedVirtualScrollDirective
  implements AfterViewInit, OnChanges, OnDestroy {
  @Input() rowHeight = 48;
  @Input() offset = 56;

  @ContentChild(MatTable) table: MatTable<any>;

  scrollStrategy: CoreTableVirtualScrollStrategy;

  private sub: Subscription;

  constructor() {
    this.scrollStrategy = new CoreTableVirtualScrollStrategy(
      this.rowHeight,
      this.offset
    );
  }

  ngAfterViewInit() {
    if (this.table.dataSource instanceof CoreTableDataSource) {
      this.sub = this.table.dataSource.filteredData.subscribe(data => {
        this.scrollStrategy.setDataLength(data.length);
      });
    }
  }

  ngOnChanges() {
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.offset);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
