import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArrayConfig } from "projects/app-toolbox/src/app/modules/form-factory/services/FormArrayConfig";
import { ConfigurationPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/configuration-pipes.service';
import { InformationBasicPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/information-basic-pipes.service';
import { InformationPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/information-pipes.service';
import { equals } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { PropertyOption, PropertySelectModel } from '../property-select/property-select.component';
import { QfArraySubgroupInitVal, QfFormArrayData, QfFormArrayFactory, QfFormControlData, QfFormControlFactory, QfFormNodeConfig } from '../query-filter/query-filter.component';
import { QueryFilterService } from '../query-filter/query-filter.service';



@Component({
  selector: 'gv-qf-form-array',
  templateUrl: './qf-form-array.component.html',
  styleUrls: ['./qf-form-array.component.scss']
})
export class QfFormArrayComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Input() formArrayFactory: QfFormArrayFactory;
  config: FormArrayConfig<QfFormArrayData>

  get isArrayProperties() {
    return !!this.formArrayFactory.config.data.arrayProperties;
  }
  get isArrayClasses() {
    return !!this.formArrayFactory.config.data.arrayClasses;
  }
  get isArraySubgroup() {
    return !!this.formArrayFactory.config.data.arraySubgroup;
  }
  get isArrayCondition() {
    return !!this.formArrayFactory.config.data.arrayCondition;
  }

  get parentIsArraySubgroup() {
    const parent = this.formArrayFactory.parent
    return parent.factoryType === 'array' && (parent.config.data as QfFormArrayData).arraySubgroup;
  }

  get conditionCanHaveChildren() {
    if (this.isArrayCondition) {

      const second = this.formArrayFactory.childConfigs[1]
      return !!second && second.id === 'properties' &&
        this.formArrayFactory.children.length < 3 &&
        this.formArrayFactory.control.valid
    }
    return false
  }

  constructor(
    private c: ConfigurationPipesService,
    private b: InformationBasicPipesService,
    private i: InformationPipesService,
    private qfs: QueryFilterService
  ) { }

  isFormArray(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.factoryType === 'array'
  }
  childIsArraySubgroup(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.factoryType === 'array' && !!(child.config.data as QfFormArrayData).arraySubgroup;
  }
  isCtrlClasses(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.control && (child.config.data as QfFormControlData).ctrlClasses;
  }
  isCtrlProperties(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.control && (child.config.data as QfFormControlData).ctrlProperties;
  }

  isFormControl(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.factoryType === 'control'
  }


  ngOnInit() {
    this.config = this.formArrayFactory.config

  }

  addClassesSubfilter() {
    this.formArrayFactory.add(this.nextIndex(), this.prepareSubgroupOfArrClasses())
  }

  removeSubfilter(i: number) {
    this.formArrayFactory.remove(i)

    if (this.childrenLength() == 1 && this.formArrayFactory.parent.factoryType === 'array') {
      const parent = this.formArrayFactory.parent as QfFormArrayFactory
      parent.removeLastChild()
    }
    // else if (
    //   this.formArrayFactory.childConfigs.filter(c => !!c.array).length === 1 &&
    //   this.parentIsArraySubgroup
    // ) {
    //   const parent = this.formArrayFactory.parent as QfFormArrayFactory
    //   parent.removeAllChildren()
    //   const c = this.formArrayFactory.children[1].config as QfFormNodeConfig;

    //   parent.append(c)
    // }
  }

  splitSubfilter(i: number, child) {
    // const initVal = this.formArrayFactory.valueChanges$.value
    const initVal = {
      data: {},
      children: [
        child.valueChanges$.value,
        {
          data: child.valueChanges$.value.data,
          children: []
        }
      ]
    };
    const arraySubgroup = this.formArrayFactory.config.data.arraySubgroup;

    const subgroup = arraySubgroup.propertyOptions$ ?
      this.qfs.createArrSubgroupOfClasses(arraySubgroup.propertyOptions$, initVal) :
      this.qfs.createArrSubgroupOfProperties(arraySubgroup.pkClasses$, initVal);

    this.formArrayFactory.remove(i)
    this.formArrayFactory.add(i, subgroup)
  }

  addPropertiesSubfilter() {
    this.formArrayFactory.add(this.nextIndex(), this.prepareSubgroupOfArrProperties())
  }
  addSubgroupItem() {
    this.formArrayFactory.add(this.nextIndex(), this.createSubgroupItem())
  }

  addCtrlSearchTerm(initValue: string) {
    const ctrlSearchTerm = this.qfs.createCtrlSearchTerm(initValue);
    this.formArrayFactory.add(this.nextIndex(), ctrlSearchTerm)
  }


  addArrProperties(options$: Observable<PropertyOption[]>, initValue: QfArraySubgroupInitVal) {
    const arrProperties: QfFormNodeConfig = this.qfs.createArrSubgroupOfClasses(options$, initValue)
    this.formArrayFactory.add(this.nextIndex(), arrProperties)
  }


  private prepareSubgroupOfArrClasses(initVal?: QfArraySubgroupInitVal): QfFormNodeConfig {
    const classTypes$ = this.formArrayFactory.valueChanges$
      .pipe<{ data: ClassAndTypeSelectModel }, ClassAndTypeSelectModel>(
        filter(x => !!x && !!x.data),
        map(x => x.data)
      )
    const propertyOptions$: Observable<PropertyOption[]> = this.i.getPropertyOptions$(classTypes$)

    return this.qfs.createArrSubgroupOfClasses(propertyOptions$, initVal)
  }



  private prepareSubgroupOfArrProperties(initVal?: QfArraySubgroupInitVal): QfFormNodeConfig {
    const pkClasses$ = this.formArrayFactory.valueChanges$
      .pipe<{ data: PropertySelectModel }, number[]>(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((a, b) => {
          return equals(a.data, b.data)
        }),
        switchMap((x) => this.i.pipePkClassesFromPropertySelectModel(x.data))
      )
    return this.qfs.createArrSubgroupOfProperties(pkClasses$, initVal)
  }

  private createSubgroupItem(initVal?): QfFormNodeConfig {
    return this.qfs.createSubgroupOfArrSoubgroup(this.formArrayFactory.config.data.arraySubgroup, initVal)
  }


  private nextIndex() {
    return this.childrenLength() + 1;
  }
  private childrenLength() {
    return this.formArrayFactory.children.length
  }

  childConfigHasId(index: number, id: string) {
    const n = this.formArrayFactory.childConfigs[index];
    return !n ? false : n.id === id;
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
