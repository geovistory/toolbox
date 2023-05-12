import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActiveProjectPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { InfResourceWithRelations, WarFieldChangeId } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { fieldToWarFieldChangeId } from '../../base.helpers';
import { BaseModalsService } from '../../services/base-modals.service';
import { EditModeService } from '../../services/edit-mode.service';
import { PaginationService } from '../../services/pagination.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { ViewFieldBodyComponent } from '../view-field-body/view-field-body.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';

@Component({
  selector: 'gv-view-field-item-preview-has-type',
  templateUrl: './view-field-item-preview-has-type.component.html',
  styleUrls: ['./view-field-item-preview-has-type.component.scss']
})
export class ViewFieldItemPreviewHasTypeComponent implements OnInit {
  resource: InfResourceWithRelations;
  ordNum?: number;
  field: Field
  fieldBody: ViewFieldBodyComponent
  showOntoInfo$: Observable<boolean>

  constructor(
    public itemComponent: ViewFieldItemComponent,
    @Optional() @Inject(READ_ONLY) public readonly: boolean,
    public editMode: EditModeService,
    private dialogs: BaseModalsService,
    private dataService: ReduxMainService,
    private ap: ActiveProjectPipesService,
    private paginationService: PaginationService,
  ) { }

  ngOnInit(): void {
    const errors: string[] = []

    if (!this.itemComponent.fieldBody) errors.push('fieldBody is required.');
    if (!this.itemComponent.field) errors.push('field is required.');
    if (!this.itemComponent.item) errors.push('item is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.resource = this.itemComponent.item.target.entity.resource
    this.ordNum = this.itemComponent.item.ordNum
    this.field = this.itemComponent.field
    this.fieldBody = this.itemComponent.fieldBody
    this.showOntoInfo$ = this.itemComponent.showOntoInfo$
  }

  async onEdit() {
    await this.dialogs.openAddHasType(
      this.fieldBody.source,
      this.field,
      this.itemComponent.item.targetClass,
      this.itemComponent.item
    ).afterClosed().toPromise();

  }

  async onDelete() {
    const pkProject = await this.ap.pkProject$.pipe(first()).toPromise()
    await this.dataService.removeEntityFromProject(
      pkProject,
      this.itemComponent.item.statement.pk_entity
    ).pipe(first()).toPromise()
    this.triggerPageReloads(pkProject, this.fieldBody.source.fkInfo, this.field)
  }

  private triggerPageReloads(pkProject: number, fkInfo: number, field: Field) {
    const fieldId: WarFieldChangeId = fieldToWarFieldChangeId(pkProject, { fkInfo }, field.property, field.isOutgoing);
    this.paginationService.reloadPagesOfField(fieldId);
  }

}
