import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ListService } from '../../services/list.service';


@Component({
  selector: 'gv-entities-tabs',
  templateUrl: './entities-tabs.component.html',
  styleUrls: ['./entities-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesTabsComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();


  constructor(
    public listService: ListService
  ) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Called when user changes to see only teEn / peIt or all classes
   */
  entityTypeChange(index: number) {
    const type = ['peIt', 'teEn', undefined][index] as 'teEn' | 'peIt' | undefined;
    if (this.listService.entityType$.value !== type)
      this.listService.entityType$.next(type)
  }
}
