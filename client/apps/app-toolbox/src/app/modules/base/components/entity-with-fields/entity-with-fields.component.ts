import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewFieldComponent } from '../view-field/view-field.component';
import { EntityFieldTimeSpanComponent } from '../entity-field-time-span/entity-field-time-span.component';
import { EntityFieldComponent } from '../entity-field/entity-field.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-entity-with-fields',
    templateUrl: './entity-with-fields.component.html',
    styleUrls: ['./entity-with-fields.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, EntityFieldComponent, EntityFieldTimeSpanComponent, AsyncPipe]
})
export class EntityWithFieldsComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() source: GvFieldSourceEntity
  @Input() fkClass: number
  @Input() scope: GvFieldPageScope
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>


  fields$: Observable<Field[]>

  timeSpanFields$: Observable<Field[]>


  constructor(
    private c: ConfigurationPipesService,
    @Optional() public parentField: ViewFieldComponent,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit() {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.fkClass) errors.push('@Input() fkClass is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
    const sections = [
      SectionName.basic,
      SectionName.metadata,
      SectionName.specific,
    ]
    this.fields$ = this.c.pipeSections(this.fkClass, DisplayType.view, sections, true)
      .pipe(
        map(fields => fields.filter(field => !this.isCircular(field)))
      )
    this.timeSpanFields$ = this.c.pipeSection(this.fkClass, DisplayType.view, SectionName.timeSpan, true)

  }

  isCircular(field: Field): boolean {
    if (this.parentField
      && this.parentField.field.property.fkProperty === field.property.fkProperty
      && field.targetMaxQuantity === 1
    ) {
      return true
    }
    return false
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
