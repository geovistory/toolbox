import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-redux';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEntityMenuComponent } from '../add-entity-menu/add-entity-menu.component';
import { AddEntityMenuTypeItemComponent } from '../add-entity-menu-type-item/add-entity-menu-type-item.component';
import { OpenCloseModule } from '../../../../shared/directives/open-close/open-close.module';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-add-entity-menu-class-item',
    templateUrl: './add-entity-menu-class-item.component.html',
    styleUrls: ['./add-entity-menu-class-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, MatTooltipModule, OntoInfoModule, OpenCloseModule, NgFor, AddEntityMenuTypeItemComponent, AsyncPipe]
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
