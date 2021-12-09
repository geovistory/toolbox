import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-factoid-property-mapping',
  templateUrl: './factoid-property-mapping.component.html',
  styleUrls: ['./factoid-property-mapping.component.scss']
})
export class FactoidPropertyMappingComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() pkClass: number;
  @Input() pkTable: number;
  @Input() pkProperty: number;
  @Input() pkColumn: number;
  @Input() defaultPkEntity: number;
  @Input() comment: string

  pkProject: number;
  pkTargetClasses: Array<number>;

  constructor(
    private c: ConfigurationPipesService,
    public p: ActiveProjectService,
  ) { }

  ngOnInit(): void {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => this.pkProject = pkProject);


    if (this.pkProperty) {
      this.c.pipeFields(this.pkClass).pipe(
        map(fields => {
          const rightFields = fields.filter(f => f.property.fkProperty == this.pkProperty)
          this.pkTargetClasses = rightFields[0].targetClasses
        })
      )
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setProperty(field: Field) {
    this.pkProperty = field.property.fkProperty;
    this.pkTargetClasses = field.targetClasses
  }

  setColumn(pkColumn: number) {
    this.pkColumn = pkColumn;
  }

  setDefault(pkEntity: number) {
    this.defaultPkEntity = pkEntity;
  }

}
