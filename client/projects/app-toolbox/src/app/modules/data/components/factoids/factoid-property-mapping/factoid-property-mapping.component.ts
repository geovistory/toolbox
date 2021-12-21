import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { FactoidMapping, FactoidPropertyMapping } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-factoid-property-mapping',
  templateUrl: './factoid-property-mapping.component.html',
  styleUrls: ['./factoid-property-mapping.component.scss']
})
export class FactoidPropertyMappingComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() fm: FactoidMapping = {}
  @Input() fpm: FactoidPropertyMapping = {} // init value

  @Output() delete = new EventEmitter();
  @Output() fpmChanged = new EventEmitter<FactoidPropertyMapping>();

  pkProject: number;
  // pkTargetClasses$: Observable<Array<number>>;
  pkTargetClasses$ = new BehaviorSubject<Array<number>>([]);
  defaultPkEntity: number;

  constructor(
    private c: ConfigurationPipesService,
    public p: ActiveProjectService,
  ) { }

  ngOnInit(): void {
    // look for the target classes of the property so that the column-mapping component knows what column to look for
    if (this.fpm?.pkProperty) this.findTargetClass(this.fpm.pkProperty)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  fpmChange(key: string, value: any) {
    this.fpm[key] = value;
    this.fpmChanged.emit(this.fpm);
    if (key == 'pkProperty') this.findTargetClass(value)
  }

  deleteRow() {
    this.delete.emit()
  }

  findTargetClass(pkProperty: number) {
    this.c.pipeFields(this.fm.pkClass).pipe(
      map(fields => {
        const rightFields = fields.filter(f => f.property.fkProperty == pkProperty)
        this.fpm.isOutgoing = rightFields[0]?.isOutgoing
        this.pkTargetClasses$.next(rightFields[0]?.targetClasses)
      })
    ).subscribe()
  }

}
