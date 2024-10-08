import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClassAndTypeSelectModel, ConfigurationPipesService, InformationBasicPipesService, InformationPipesService, PropertyOption, PropertySelectModel } from '@kleiolab/lib-redux';
import { equals } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { FormArrayConfig } from '../../../../lib/form-factory/types/FormArrayConfig';
import { QfFormControlComponent } from '../qf-form-control/qf-form-control.component';
import { QfArraySubgroupInitVal, QfFormArrayData, QfFormArrayFactory, QfFormControlData, QfFormControlFactory, QfFormNodeConfig } from '../query-filter/query-filter.component';
import { QueryFilterService } from '../query-filter/query-filter.service';



@Component({
  selector: 'gv-qf-form-array',
  templateUrl: './qf-form-array.component.html',
  styleUrls: ['./qf-form-array.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, QfFormControlComponent, MatButtonModule, MatTooltipModule, MatIconModule, NgClass]
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
    return this.formArrayFactory?.parent?.arrayFactory?.config?.data?.arraySubgroup ? true : false
  }

  get conditionCanHaveChildren() {
    if (this.isArrayCondition) {

      const second = this.formArrayFactory.childConfigs[1]
      return !!second && second.id === 'properties' &&
        this.formArrayFactory.children.length < 3 &&
        this.formArrayFactory.formArray.valid
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
    return child.formArray && (child.config.data as QfFormControlData).ctrlClasses;
  }
  isCtrlProperties(child: QfFormArrayFactory | QfFormControlFactory) {
    return child.formArray && (child.config.data as QfFormControlData).ctrlProperties;
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

    if (this.childrenLength() == 1 && this.formArrayFactory.parent.arrayFactory) {
      this.formArrayFactory.parent.arrayFactory.removeLastChild()
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
