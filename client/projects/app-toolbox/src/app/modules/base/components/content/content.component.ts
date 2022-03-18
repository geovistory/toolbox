import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BaseModalsService } from '../../services/base-modals.service';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldTreeNodeService } from '../../services/view-field-tree-node.service';
import { ViewFieldItemTypeFn } from '../view-field-item/view-field-item.component';
import { VIEW_FIELD_ITEM_TYPE } from '../view-field-item/VIEW_FIELD_ITEM_TYPE';
import { ViewFieldDisplayMode, VIEW_FIELD_DISPLAY_MODE } from '../view-field/VIEW_FIELD_DISPLAY_MODE';
const itemTypeProvider: ViewFieldItemTypeFn = (f, s) => {
  if ([C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID].includes(s.targetClass)) {
    return 'content-tree'
  }
}

export interface AddButton {
  field: Field;
  targetClass: number;
  targetClassLabel: string;
}



const displayMode: ViewFieldDisplayMode = 'tree'
@Component({
  selector: 'gv-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldTreeNodeService,
    { provide: VIEW_FIELD_ITEM_TYPE, useValue: itemTypeProvider },
    { provide: VIEW_FIELD_DISPLAY_MODE, useValue: displayMode }
  ]
})
export class ContentComponent implements OnInit {
  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  readmode$: Observable<boolean>;
  @Input() section: SectionName;
  @Input() scope: GvFieldPageScope;

  @Input() showEmptyFieldsOnInit: boolean;

  linkedSources = SectionName.linkedSources
  fields$: Observable<Field[]>
  addButtons$: Observable<AddButton[]>
  isExpressionLike$: Observable<boolean>;
  expressionIds = [C_218_EXPRESSION_ID, C_503_EXPRESSION_PORTION_ID]

  constructor(
    private c: ConfigurationPipesService,
    private modals: BaseModalsService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit(): void {
    this.fields$ = this.pkClass$.pipe(switchMap(pkClass => this.c.pipeSection(pkClass, DisplayType.view, this.linkedSources)))
    this.addButtons$ = this.fields$.pipe(pipeAddButtons)
    this.isExpressionLike$ = this.pkClass$.pipe(map(id => this.expressionIds.includes(id)))
  }
  openAddStatementDialog(item: AddButton) {
    this.modals.openAddStatementDialog({
      field: item.field,
      hiddenProperty: item.field.property,
      source: this.source,
      targetClass: item.targetClass,
      showAddList: false
    })
  }
}

export const pipeAddButtons = map<Field[], AddButton[]>(fields => {
  const addButtons: AddButton[] = []
  fields.forEach((field => {
    field.targetClasses.forEach(targetClass => {
      if (!field.targets[targetClass].removedFromAllProfiles) {
        addButtons.push({ field, targetClass, targetClassLabel: field.targets[targetClass].targetClassLabel })
      }
    })
  }))
  return addButtons;
})
