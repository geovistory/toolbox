import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { openClose } from '../../../information/shared/animations';
import { EditModeService } from '../../services/edit-mode.service';


@Component({
  selector: 'gv-view-section-body',
  templateUrl: './view-section-body.component.html',
  styleUrls: ['./view-section-body.component.scss'],
  animations: [openClose],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSectionBodyComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  readmode$: Observable<boolean>;
  @Input() section: SectionName;
  @Input() scope: GvFieldPageScope;
  @Input() showBodyOnInit: boolean;
  @Input() showEmptyFieldsOnInit: boolean;


  fields$: Observable<Field[]>
  showBody$ = new BehaviorSubject(false);
  // treeControl = new NestedTreeControl<Field>(node => ([]));
  dataSource = new MatTreeNestedDataSource<Field>();
  showEmptyFields$ = new BehaviorSubject(false);

  constructor(
    public c: ConfigurationPipesService,
    public p: ActiveProjectService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }
  ngOnInit() {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readmode$) errors.push('readmode$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    if (this.showBodyOnInit) this.showBody$.next(this.showBodyOnInit)
    this.readmode$.pipe(takeUntil(this.destroy$)).subscribe(readonly => {
      this.showEmptyFields$.next(!readonly)
    })
    // if (this.showEmptyFieldsOnInit) this.showEmptyFields$.next(this.showEmptyFieldsOnInit)
    this.fields$ = this.pkClass$.pipe(first(x => {
      return !!x
    }), switchMap(pkClass => this.c.pipeSection(pkClass, DisplayType.view, this.section)))

    this.fields$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  trackBy(_, f: Field) {
    return [f.sourceClass, f.property.fkProperty, f.property.fkPropertyOfProperty, f.isOutgoing].join('-')
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

}
