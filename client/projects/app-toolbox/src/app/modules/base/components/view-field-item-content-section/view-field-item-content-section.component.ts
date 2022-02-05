import { Component, OnInit } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity, InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { C_218_EXPRESSION_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { BaseModalsService } from '../../services/base-modals.service';
import { ViewFieldItemCountSumService } from '../../services/view-field-item-count-sum.service';
import { ViewFieldTreeNodeService } from '../../services/view-field-tree-node.service';
import { AddButton, pipeAddButtons } from '../content/content.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';
@Component({
  selector: 'gv-view-field-item-content-section',
  templateUrl: './view-field-item-content-section.component.html',
  styleUrls: ['./view-field-item-content-section.component.scss'],
  providers: [
    ViewFieldTreeNodeService,
    ViewFieldItemCountSumService
  ]
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

  constructor(
    public itemComponent: ViewFieldItemComponent,
    // public fieldComponent: ViewFieldComponent,
    public nodeService: ViewFieldTreeNodeService,
    private c: ConfigurationPipesService,
    private modals: BaseModalsService,
    public itemCountService: ViewFieldItemCountSumService
  ) { }

  ngOnInit(): void {
    this.resource = this.itemComponent.item.target.entity.resource
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.classLabel = this.field.targets[this.resource.fk_class]?.targetClassLabel
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$


    this.sectionSource = { fkInfo: this.resource.pk_entity }
    this.sectionPkClass$ = of(this.resource.fk_class)
    this.sectionScope = this.itemComponent.scope

    this.isExpression = this.itemComponent.item.targetClass === C_218_EXPRESSION_ID
    if (this.isExpression) this.hideTreeNodeAndFieldHeader()

    // if (this.showEmptyFieldsOnInit) this.showEmptyFields$.next(this.showEmptyFieldsOnInit)
    this.fields$ = this.c.pipeSection(this.itemComponent.item.targetClass, DisplayType.view, this.sectionSection)
    this.addButtons$ = this.fields$.pipe(pipeAddButtons)

  }


  hideTreeNodeAndFieldHeader() {
    this.cachedIndentation = this.nodeService.indentation$.value;
    this.nodeService.indentation$.next(-1)
    this.hideTreeNodeAndFieldHeader$.next(true)
    // this.fieldComponent.showHeader$.next(false)
    // this.fieldComponent.bodyComponent.showBody$.next(true)
    this.showBody$.next(true)

  }

  showTreeNodeAndFieldHeader() {
    this.nodeService.indentation$.next(this.cachedIndentation);
    this.hideTreeNodeAndFieldHeader$.next(false)
    // this.fieldComponent.showHeader$.next(true)
  }

  openAddStatementDialog(item: AddButton) {
    this.modals.openAddStatementDialog({
      field: item.field,
      hiddenProperty: item.field.property,
      source: this.sectionSource,
      targetClass: item.targetClass,
      valueTarget: true // actually means: don't show add list
    })
  }
}


