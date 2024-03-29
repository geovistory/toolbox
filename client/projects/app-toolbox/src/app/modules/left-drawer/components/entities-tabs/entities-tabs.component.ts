import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ListService } from '../../services/list.service';

type Options = {
  value: any;
  label: string;
};

@Component({
  selector: 'gv-entities-tabs',
  templateUrl: './entities-tabs.component.html',
  styleUrls: ['./entities-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesTabsComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();

  // Entity type (TeEn/PeIt) Filter
  typeOptions: Options[] = [
    { value: 'peIt', label: '<i class="gv-icon gv-icon-persistent-entity"></i> Persistent' },
    { value: 'teEn', label: '<i class="fa fa-star-o"></i> Temporal' },
    { value: undefined, label: '<i class="gv-icon gv-icon-entity"></i> All' },
  ]
  selectedType: Options = this.typeOptions[0];

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
  entityTypeChange(type: Options) {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.listService.entityType$.next(type.value)
    }
  }
}
