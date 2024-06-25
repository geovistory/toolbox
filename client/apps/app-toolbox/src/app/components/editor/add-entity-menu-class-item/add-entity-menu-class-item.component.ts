import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-redux';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEntityMenuTypeItemComponent } from '../add-entity-menu-type-item/add-entity-menu-type-item.component';

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClassInfoComponent } from '../../misc/class-info/class-info.component';
import { OpenCloseComponent } from '../../misc/open-close/open-close.component';
import { AddEntityMenuService } from '../add-entity-menu/add-entity-menu.service';

@Component({
  selector: 'gv-add-entity-menu-class-item',
  templateUrl: './add-entity-menu-class-item.component.html',
  styleUrls: ['./add-entity-menu-class-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule, MatTooltipModule, ClassInfoComponent, NgFor, AddEntityMenuTypeItemComponent, AsyncPipe, OpenCloseComponent]
})
export class AddEntityMenuClassItemComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() item: AddMenuClassOrTypeItem;

  showBody$ = new BehaviorSubject(false)
  constructor(public menu: AddEntityMenuService) { }

  ngOnInit(): void {
    this.menu.component.expandAll$.pipe(takeUntil(this.destroy$)).subscribe((expand => {
      if (this.showBody$.value !== expand) this.showBody$.next(expand)
    }))
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
