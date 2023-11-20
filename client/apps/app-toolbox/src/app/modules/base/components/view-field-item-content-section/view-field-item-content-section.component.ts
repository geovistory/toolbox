import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { C_218_EXPRESSION_ID } from '../../../../ontome-ids';
import { EntityPreviewModule } from '../../../../shared/components/entity-preview/entity-preview.module';
import { OntoInfoModule } from '../../../../shared/components/onto-info/onto-info.module';
import { openAddStatementDialog } from '../../lib/openAddStatementDialog';
import { GvDndGlobalService } from '../../services/dnd-global.service';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldItemCountSumService } from '../../services/view-field-item-count-sum.service';
import { ViewFieldTreeNodeService } from '../../services/view-field-tree-node.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { AddButton, pipeAddButtons } from '../content/content.component';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemClassInfoComponent } from '../view-field-item-class-info/view-field-item-class-info.component';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemEntityMenuComponent } from '../view-field-item-entity-menu/view-field-item-entity-menu.component';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';
import { ViewFieldTreeItemDropZoneComponent } from '../view-field-tree-item-drop-zone/view-field-tree-item-drop-zone.component';

@Component({
  selector: 'gv-view-field-item-content-section',
  templateUrl: './view-field-item-content-section.component.html',
  styleUrls: ['./view-field-item-content-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldTreeNodeService,
    ViewFieldItemCountSumService
  ],
  standalone: true,
  imports: [ViewFieldItemContainerComponent, NgClass, NgIf, MatButtonModule, MatIconModule, ViewFieldItemClassInfoComponent, EntityPreviewModule, ViewFieldItemEntityMenuComponent, MatDividerModule, NgFor, MatMenuModule, OntoInfoModule, ViewFieldTreeItemDropZoneComponent, forwardRef(() => ViewFieldBodyComponent), AsyncPipe]
})
export class ViewFieldItemContentSectionComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  classLabel: string
  showOntoInfo$: Observable<boolean>

  sectionSource: GvFieldSourceEntity
  sectionPkClass$: Observable<number>
  sectionScope: GvFieldPageScope;
  sectionSection = SectionName.linkedSources;

  showBody$ = new BehaviorSubject(false)

  isExpression: boolean
  cachedIndentation: number
  hideTreeNodeAndFieldHeader$ = new BehaviorSubject(false)

  fields$: Observable<Field[]>

  addButtons$: Observable<AddButton[]>

  childrenCount$ = new Subject<number>()

  c218ExpressionId = C_218_EXPRESSION_ID

  enableDropZoneEnd$: Observable<boolean>
  dragover$ = new BehaviorSubject(false)

  constructor(
    public item: ViewFieldItemService,
    public nodeService: ViewFieldTreeNodeService,
    private c: ConfigurationPipesService,
    private dialog: MatDialog,
    public itemCountService: ViewFieldItemCountSumService,
    public dndGlobal: GvDndGlobalService,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService
  ) {
    this.enableDropZoneEnd$ = this.showBody$.pipe(map(v => !v))
  }

  ngOnInit(): void {
    this.resource = this.item.component.item.target.entity.resource
    this.ordNum = this.item.component.item.ordNum
    this.field = this.item.component.field
    this.classLabel = this.field.targets[this.resource.fk_class]?.targetClassLabel
    this.showOntoInfo$ = this.item.component.showOntoInfo$


    this.sectionSource = { fkInfo: this.resource.pk_entity }
    this.sectionPkClass$ = of(this.resource.fk_class)
    this.sectionScope = this.item.component.scope

    this.isExpression = this.item.component.item.targetClass === C_218_EXPRESSION_ID
    // if (this.isExpression) this.hideTreeNodeAndFieldHeader()
    if (this.isExpression) this.showBody$.next(true);

    this.fields$ = this.c.pipeSection(this.item.component.item.targetClass, DisplayType.view, this.sectionSection)
    this.addButtons$ = this.fields$.pipe(pipeAddButtons)

  }


  hideTreeNodeAndFieldHeader() {
    this.cachedIndentation = this.nodeService.indentation$.value;
    this.nodeService.indentation$.next(0)
    this.hideTreeNodeAndFieldHeader$.next(true)
    this.showBody$.next(true)

  }

  showTreeNodeAndFieldHeader() {
    this.nodeService.indentation$.next(this.cachedIndentation);
    this.hideTreeNodeAndFieldHeader$.next(false)
  }

  openAddStatementDialog(item: AddButton) {
    openAddStatementDialog(
      this.dialog,
      {
        field: item.field,
        hiddenProperty: item.field.property,
        source: this.sectionSource,
        targetClass: item.targetClass,
        showAddList: false
      })
  }
}


