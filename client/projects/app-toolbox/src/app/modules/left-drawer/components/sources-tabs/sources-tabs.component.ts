import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListService } from '../../services/list.service';

type Option = {
  value: 'container' | 'content';
  label: string;
};

@Component({
  selector: 'gv-sources-tabs',
  templateUrl: './sources-tabs.component.html',
  styleUrls: ['./sources-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourcesTabsComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();

  typeOptions: Option[] = [
    { value: 'container', label: 'Container' },
    { value: 'content', label: 'Content' },
  ]
  selectedType$ = new BehaviorSubject<Option>(this.typeOptions[0]);

  constructor(
    private c: ConfigurationPipesService,
    public listService: ListService
  ) {
    const sourceClasses$ = this.c.pipeClassesOfProject().pipe(
      map(items => items
        .filter(item => item.belongsToCategory?.sources?.showInAddMenu)
        .map(item => item.dfhClass.pk_class)
      )
    );

    const contentClasses = [C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID]
    listService.pkAllowedClasses$ = combineLatest([sourceClasses$, this.selectedType$])
      .pipe(map(([sourceClasses, option]) => {
        if (option.value === 'content') return contentClasses;
        return sourceClasses;
      }))
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Called when user clicks tab
   */
  optionChange(type: Option) {
    if (this.selectedType$.value.value !== type.value) {
      this.selectedType$.next(type);
    }
  }
}
