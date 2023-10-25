import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field, FieldPage, GvFieldTargets, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { values } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { EditModeService } from '../../services/edit-mode.service';
import { PaginationService } from '../../services/pagination.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { ViewFieldDialogComponent, ViewFieldDialogData } from '../view-field-dialog/view-field-dialog.component';

@Component({
  selector: 'gv-entity-field',
  templateUrl: './entity-field.component.html',
  styleUrls: ['./entity-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFieldComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @HostBinding('style.display') display = 'none'

  @Input() field: Field
  @Input() source: GvFieldSourceEntity
  @Input() scope: GvFieldPageScope
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  isCircular = false;
  page$: Observable<FieldPage>
  constructor(
    private p: ActiveProjectPipesService,
    private state: StateFacade,
    private i: InformationPipesService,
    private pag: PaginationService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit() {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    const page: GvFieldPage = {
      source: this.source,
      property: this.field.property,
      isOutgoing: this.field.isOutgoing,
      limit: 1,
      offset: 0,
      scope: this.scope,
    }
    const targets = this.getFieldTargets(this.field)
    this.page$ = this.i.pipeFieldPage(page, this.getFieldTargets(this.field), this.field.isTimeSpanShortCutField)
    this.page$.pipe(takeUntil(this.destroy$)).subscribe(p => {
      let display: string
      if (p.count > 0) display = 'inherit'
      else display = 'none'
      if (this.display !== display) {
        this.display = display
        this.ref.detectChanges()
      }
    })

    this.registerUpdateListener(targets, page);
  }

  private registerUpdateListener(targets: GvFieldTargets, page: GvFieldPage) {
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      const req: GvFieldPageReq = {
        pkProject,
        targets,
        page
      };
      this.pag.listenToPageUpdates(req, this.destroy$);
    });
  }

  getFieldTargets(field: Field): GvFieldTargets {
    const res: GvFieldTargets = {}
    values(field.targets).forEach(t => {
      res[t.targetClass] = t.viewType.nestedResource ? { entityPreview: 'true' } : t.viewType
    })
    return res
  }

  openList() {
    this.page$.pipe(first()).subscribe((subentityPage) => {

      const data: ViewFieldDialogData = {
        title: this.field.label,
        field: this.field,
        source: this.source,
        scope: this.scope,
        readonly: this.readonly,
        showOntoInfo$: this.showOntoInfo$,
      }
      this.dialog.open(ViewFieldDialogComponent, {
        data
      })
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
