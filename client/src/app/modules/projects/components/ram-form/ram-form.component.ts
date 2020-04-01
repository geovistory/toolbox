import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActiveProjectService, EntityPreview, DatChunk } from 'app/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, tap, delay, takeUntil, filter, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
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

  referenceCtrl = new FormControl()

  constructor(public p: ActiveProjectService,
    public ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    // Set default language for exact reference form control
    this.p.defaultLanguage$.pipe(first(l => !!l), takeUntil(this.destroy$)).subscribe((language) => {
      this.referenceCtrl.setValue({ language, fk_language: language.pk_entity })
    })

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
