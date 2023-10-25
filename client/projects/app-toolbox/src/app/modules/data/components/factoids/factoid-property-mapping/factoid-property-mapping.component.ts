import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-redux';
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
  selectedKlass$ = new BehaviorSubject<number>(-1);

  constructor(
    private c: ConfigurationPipesService,
    public p: ActiveProjectService,
  ) { }

  ngOnInit(): void {
    // look for the target classes of the property so that the column-mapping component knows what column to look for
    if (this.fpm?.pkProperty) this.findTargetClass(this.fpm.pkProperty)

    // init comment to empty
    if (!this.fpm?.comment) this.fpm.comment = ""
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

  selectedClass(klass: number) {
    this.selectedKlass$.next(klass);
  }

  deleteRow() {
    this.delete.emit()
  }

  findTargetClass(pkProperty: number) {
    this.c.pipeFields(this.fm.pkClass).pipe(
      map(fields => {
        const rightField = fields.find(f => f.property.fkProperty == pkProperty)
        this.fpm.isOutgoing = rightField?.isOutgoing
        this.pkTargetClasses$.next(rightField?.targetClasses)
        // if there is only one target class, we already know for sure what class it would be in the default input
        if (rightField?.targetClasses.length == 1) this.selectedKlass$.next(rightField.targetClasses[0])
      })
    ).subscribe()
  }

}
