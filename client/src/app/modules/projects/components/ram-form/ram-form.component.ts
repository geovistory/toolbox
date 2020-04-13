import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActiveProjectService, DatChunk, EntityPreview, InfRole, InfRoleInterface, InfTextProperty, InfLangString } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { delay, filter, first, map, switchMap, takeUntil, shareReplay } from 'rxjs/operators';
import { ActionResultObservable } from 'app/core/store/actions';


/**
 * This component is a form to create roles (~statements) of these properties:
 * r: chunk --> geovP11 – Refers to (~annotates) --> CRM Entity
 * a: F2, F3, F4, F5, geovC4 (~source) -->  P129 – is About --> CRM Entity
 * m: F2, F3, F4, F5, geovC4 (~source) --> geovP2 – Mentions --> CRM Entity
 */
@Component({
  selector: 'gv-ram-form',
  templateUrl: './ram-form.component.html',
  styleUrls: ['./ram-form.component.scss']
})
export class RamFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  source$: Observable<{ chunk?: DatChunk, ep?: EntityPreview }>;

  targetEntityPreview$: Observable<EntityPreview>;

  showExactReference$: Observable<boolean>

  referenceCtrl = new FormControl()

  ramFormValue$: Observable<InfRole | undefined>;

  saving: boolean;

  constructor(public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    // Set default language for exact reference form control
    this.p.defaultLanguage$.pipe(first(l => !!l), takeUntil(this.destroy$)).subscribe((language) => {
      this.referenceCtrl.setValue({ language, fk_language: language.pk_entity })
    })

    this.showExactReference$ = combineLatest(this.p.ramSource$, this.p.ramProperty$).pipe(
      map(([s, p]) => {
        return !!s && p === DfhConfig.PROPERTY_PK_GEOVP2_MENTIONS
      })
    )

    this.targetEntityPreview$ = this.p.ramTarget$.pipe(
      switchMap((pk) => this.p.streamEntityPreview(pk))
    )

    this.source$ = this.p.ramSource$.pipe(
      filter(s => !!s),
      switchMap((source) => {
        if (source.pkEntity) {
          return this.p.streamEntityPreview(source.pkEntity).pipe(
            map(ep => ({ ep }))
          )
        }
        return new BehaviorSubject({ chunk: source.chunk })
      })
    )

    // TODO find out why this is needed
    this.source$.pipe(delay(0), takeUntil(this.destroy$)).subscribe(() => {
      this.ref.detectChanges()
    })

    this.ramFormValue$ = combineLatest(
      this.p.ramSource$,
      this.p.ramProperty$,
      this.p.ramTarget$,
      this.referenceCtrl.valueChanges as Observable<InfTextProperty>
    ).pipe(
      map(([s, p, t, r]) => {
        // Validate source
        if (!s || (!s.chunk && !s.pkEntity)) return;
        // Validate property
        if (!p) return;
        // validate target
        if (!t) return;

        // this is correct for outgoing properties
        const subject = s;
        const object = t;

        // create statement
        const statement: InfRole = {
          pk_entity: undefined,

          // subject
          fk_temporal_entity: subject.pkEntity,
          domain_chunk: subject.chunk,
          fk_subject_data: undefined,
          fk_subject_tables_cell: undefined,
          fk_subject_tables_row: undefined,

          // property
          fk_property: p,
          fk_property_of_property: undefined,

          // object
          fk_entity: object,
          fk_object_data: undefined,
          fk_object_tables_cell: undefined,
          fk_object_tables_row: undefined,


          // rest
          is_in_project_count: undefined,
          community_favorite_calendar: undefined,
          is_standard_in_project_count: undefined,
        }


        // create statement of statement for exact reference
        if (!!r) {

          const langString: InfLangString = {
            pk_entity: undefined,
            string: r.string,
            quill_doc: r.quill_doc,
            fk_class: DfhConfig.CLASS_PK_REFERENCE,
            fk_language: r.fk_language
          }

          const statementOfStatement: InfRole = {
            pk_entity: undefined,

            // subject
            subject_inf_role: statement,
            fk_temporal_entity: undefined,
            fk_subject_data: undefined,
            fk_subject_tables_cell: undefined,
            fk_subject_tables_row: undefined,

            // property
            fk_property: undefined,
            fk_property_of_property: DfhConfig.P_O_P_GEOV_HAS_REFERENCE,

            // object
            fk_entity: undefined,
            fk_object_data: undefined,
            fk_object_tables_cell: undefined,
            fk_object_tables_row: undefined,
            lang_string: langString,

            // rest
            is_in_project_count: undefined,
            community_favorite_calendar: undefined,
            is_standard_in_project_count: undefined,
          }
          return statementOfStatement;
        }
        else {
          return statement;
        }
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  }

  onSave() {
    combineLatest(this.p.pkProject$, this.ramFormValue$)
      .pipe(
        first(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([pkProject, val]) => {
          this.saving = true;
          if (!!val) {
            this.p.inf.role.upsert([val], pkProject).resolved$
              .pipe(first(res => !!res), takeUntil(this.destroy$)).subscribe(
                success => {
                  this.saving = false;
                  this.p.ramReset()
                }
              );
          }
        }
      )
  }

  onDropSource(entity: EntityPreview) {
    this.p.ramSource$.next({ pkEntity: entity.pk_entity });
  }
  onDropTarget(entity: EntityPreview) {
    this.p.ramTarget$.next(entity.pk_entity);
  }


  verifyIsSourceOrSection() {
    return (entity: EntityPreview) => [
      DfhConfig.CLASS_PK_EXPRESSION,
      DfhConfig.CLASS_PK_EXPRESSION_PORTION,
      DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
      DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
      DfhConfig.CLASS_PK_ITEM,
      DfhConfig.CLASS_PK_WEB_REQUEST
    ].includes(entity.fk_class);
  }

  verifyIsEntity() {
    return (entity: EntityPreview) => !!entity.pk_entity;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
