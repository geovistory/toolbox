import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectPipesService, ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { C_933_ANNOTATION_IN_TEXT_ID, P_1872_IS_ANNOTATED_IN_ID, P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from 'projects/app-toolbox/src/app/ontome-ids';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-view-field-referred-to-by',
  templateUrl: './view-field-referred-to-by.component.html',
  styleUrls: ['./view-field-referred-to-by.component.scss']
})
export class ViewFieldReferredToByComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() pkClass: number;
  @Input() source: GvFieldSourceEntity;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() scope: GvFieldPageScope;
  @Input() showBodyOnInit = true;

  field$: Observable<Field>
  constructor(
    private p: ActiveProjectService,
    private pp: ActiveProjectPipesService,
    public dataApi: ReduxMainService,
    private c: ConfigurationPipesService) { }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.pkClass) errors.push('@Input() pkClass is required.');
    if (!this.source) errors.push('@Input() source is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.field$ = this.c.pipeFields(this.pkClass)
      .pipe(
        map(fields => fields.find(field => (
          field.isOutgoing === false &&
          field.property.fkProperty === P_1875_ANNOTATED_ENTITY_ID
        ))),
        filter(field => !!field),
      )
  }

  onAddClickHook = () => {
    this.p.ramReset()
    this.pp.streamEntityPreview(this.source.fkInfo).pipe(first(), takeUntil(this.destroy$)).subscribe(e => {
      this.p.ramOnSaveCallback = () => this.onSaveAnnotationCallback()
      this.p.ramOpen$.next(true);
      this.p.ramTitle$.next(`Annotate ${e.class_label} – ${e.entity_label}`);
      this.p.ramProperty$.next(1); // irrelevant since we have a callback
      this.p.ramTarget$.next(1); // irrelevant since we have a callback
      // this.p.ramTitlePart2$.next(`${rootEntity.class_label} – ${rootEntity.entity_label}`);
      this.p.ramBoxLeft$.next('select-text');
      this.p.ramTargetIsFix$.next(true)
    })

  }
  async onSaveAnnotationCallback(): Promise<any> {
    const req = await combineLatest([this.p.pkProject$, this.p.ramSource$.pipe(filter(x => !!x))])
      .pipe(
        map(([pkProject, source]) => {
          const annotation: InfResourceWithRelations = {
            fk_class: C_933_ANNOTATION_IN_TEXT_ID,
            outgoing_statements: [
              {
                fk_property: P_1872_IS_ANNOTATED_IN_ID,
                fk_object_info: source.annotation.pkEntityOfText // Text
              },
              {
                fk_property: P_1874_AT_POSITION_ID,
                object_appellation: source.annotation.textChunk
              },
              {
                fk_property: P_1875_ANNOTATED_ENTITY_ID,
                fk_object_info: this.source.fkInfo
              }
            ]
          }
          return { pkProject, annotation }
        }),
        first(),
      )
      .toPromise()

    return this.dataApi.upsertInfResourcesWithRelations(req.pkProject, [req.annotation])
      .pipe(first())
      .toPromise()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

