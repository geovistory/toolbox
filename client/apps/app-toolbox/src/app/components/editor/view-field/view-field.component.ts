import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Field, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { fieldToFieldId } from '../../../lib/converters/fieldToFieldId';
import { getFormTargetClasses } from '../../../lib/converters/getFormTargetClasses';
import { EditModeService } from '../../../services/edit-mode.service';
import { ViewFieldAddHooksService } from '../../../services/view-field-add-hooks.service';
import { ViewFieldTreeNodeService } from '../../../services/view-field-tree-node.service';
import { ChooseClassDialogComponent, ChooseClassDialogData, ChooseClassDialogReturn } from '../choose-class-dialog/choose-class-dialog.component';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldHeaderComponent } from '../view-field-header/view-field-header.component';
import { ViewFieldService } from './view-field.service';

@Component({
  selector: 'gv-view-field',
  templateUrl: './view-field.component.html',
  styleUrls: ['./view-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldService,
    ViewFieldTreeNodeService,
    ViewFieldAddHooksService
  ],
  standalone: true,
  imports: [ViewFieldHeaderComponent, MatDividerModule, forwardRef(() => ViewFieldBodyComponent), AsyncPipe]
})
export class ViewFieldComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() source: GvFieldSourceEntity;
  @Input() field: Field
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() scope: GvFieldPageScope;
  @Input() showBodyOnInit = false;
  itemsCount$: Observable<number>;
  targetClassLabels: string[]
  @Input() onAddClickHook: () => void

  showHeader$ = new BehaviorSubject(true)
  showBody$ = new BehaviorSubject(false)
  showAddButton$: Observable<boolean>
  constructor(
    private state: StateFacade,
    public dialog: MatDialog,
    private addHooks: ViewFieldAddHooksService,
    public nodeService: ViewFieldTreeNodeService,
    public editMode: EditModeService,
    viewFieldService: ViewFieldService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
    viewFieldService.registerComponent(this)
  }


  getKey(_, item) {
    return _;
  }

  ngOnInit() {

    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));


    if (this.field.isSpecialField === 'time-span') {
      this.itemsCount$ = of(1);
    } else {
      this.itemsCount$ = this.state.data.inf.statement.getPageCount$(fieldToFieldId(this.field, this.source, this.scope)).pipe(
        shareReplay({ refCount: true, bufferSize: 1 })
      )
    }
    this.targetClassLabels = values(this.field.targets)
      .filter(c => !c.removedFromAllProfiles)
      .map(c => c.targetClassLabel)

    /**
     * Pipe data from redux store
     */
    this.showAddButton$ = combineLatest(this.itemsCount$, this.readmode$)
      .pipe(map(([n, r]) => {
        if (r) return false;

        if (this.field.targetMaxQuantity === -1) return true;
        if (this.field.targetMaxQuantity <= n) return false
        if (this.field.isSpecialField === 'time-span' && 1 <= n) return false
        return true;
      }))

  }

  async addClick() {
    if (this.field.isSpecialField === 'time-span') {
      return;
    }
    const hook = await this.addHooks.beforeChoosingClass(this)
    if (hook) return hook();

    const targetClasses = getFormTargetClasses(this.field)
    let targetClass: number;
    // More than one target class?
    if (targetClasses.length > 1) {

      // Let the user select target class first

      const data: ChooseClassDialogData = {
        pkClasses: targetClasses.map(t => t.targetClass),
        title: 'Choose a class',
        showOntoInfo$: this.showOntoInfo$
      }
      targetClass = await this.dialog.open<ChooseClassDialogComponent, ChooseClassDialogData, ChooseClassDialogReturn>(
        ChooseClassDialogComponent,
        {
          data,
          width: '500px'
        }
      ).afterClosed().pipe(first()).toPromise()
    }
    // Only one target class!
    else {
      targetClass = targetClasses[0].targetClass;
    }

    const dataModified = await this.addHooks.afterChoosingClass(this, targetClass)
    if (dataModified) this.showBody$.next(true);
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
