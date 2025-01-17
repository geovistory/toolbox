import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID } from '../../../../../lib/constants/ontome-ids';
import { ListService } from '../../services/list.service';

type Option = {
  value: 'container' | 'content';
  label: string;
};

@Component({
  selector: 'gv-sources-tabs',
  templateUrl: './sources-tabs.component.html',
  styleUrls: ['./sources-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatTabsModule]
})
export class SourcesTabsComponent implements OnDestroy {

  destroy$ = new Subject<boolean>();

  typeOptions: Option[] = [
    { value: 'container', label: 'Container' },
    { value: 'content', label: 'Content' },
  ]
  selectedType$ = new BehaviorSubject<'container' | 'content'>('container');

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
        if (option === 'content') return contentClasses;
        if (option === 'container') return sourceClasses.filter(c => !contentClasses.includes(c));
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
  optionChange(index: number) {
    const type = ['container', 'content'][index] as 'container' | 'content';
    if (this.selectedType$.value !== type) {
      this.selectedType$.next(type);
    }
  }
}
