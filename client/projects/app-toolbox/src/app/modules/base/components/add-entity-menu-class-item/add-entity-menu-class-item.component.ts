import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-queries';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEntityMenuComponent } from '../add-entity-menu/add-entity-menu.component';

@Component({
  selector: 'gv-add-entity-menu-class-item',
  templateUrl: './add-entity-menu-class-item.component.html',
  styleUrls: ['./add-entity-menu-class-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityMenuClassItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() item: AddMenuClassOrTypeItem;

  showBody$ = new BehaviorSubject(false)
  constructor(public menuComponent: AddEntityMenuComponent) { }

  ngOnInit(): void {
    this.menuComponent.expandAll$.pipe(takeUntil(this.destroy$)).subscribe((expand => {
      if (this.showBody$.value !== expand) this.showBody$.next(expand)
    }))
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
