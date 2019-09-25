import { Component, OnInit, Input } from '@angular/core';
import { QfFormArrayFactory, QfFormControlFactory, QfFormNodeConfig, QfFormArrayData, QfFormControlData, createSubgroupNodeConfig, FilterDefNode } from '../query-filter/query-filter.component';
import { PropertyOption, PropertySelectModel } from '../property-select/property-select.component';
import { Observable, combineLatest, empty } from 'rxjs';
import { FormArrayConfig } from 'app/modules/form-factory/services/form-factory.service';
import { map, mapTo, tap, switchMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { ConfigurationPipesService } from 'app/modules/information/new-services/configuration-pipes.service';
import { InformationBasicPipesService } from 'app/modules/information/new-services/information-basic-pipes.service';
import { SysConfig } from 'app/core';
import { flatten, equals, uniqBy, uniq } from 'ramda';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { combineLatestOrEmpty } from 'app/modules/form-factory/core/form-factory.models';
import { InformationPipesService } from 'app/modules/information/new-services/information-pipes.service';



@Component({
  selector: 'gv-qf-form-array',
  templateUrl: './qf-form-array.component.html',
  styleUrls: ['./qf-form-array.component.scss']
})
export class QfFormArrayComponent implements OnInit {

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

  get parentIsArraySubgroup() {
    const parent = this.formArrayFactory.parent
    return parent.factoryType === 'array' && (parent.config.data as QfFormArrayData).arraySubgroup;
  }


  constructor(
    private c: ConfigurationPipesService,
    private b: InformationBasicPipesService,
    private i: InformationPipesService
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

    // Initialize children from initVal
    if (this.isArrayClasses && this.formArrayFactory.config.data.arrayClasses.initVal.children) {
      const children = this.formArrayFactory.config.data.arrayClasses.initVal.children;
      children.forEach(child => {
        this.formArrayFactory.add(this.nextIndex(), this.createSubgroupOfArrClasses(child))
      })
    }
    else if (this.isArrayProperties && this.formArrayFactory.config.data.arrayProperties.initVal.children) {
      const children = this.formArrayFactory.config.data.arrayProperties.initVal.children;
      children.forEach(child => {
        this.formArrayFactory.add(this.nextIndex(), this.createSubgroupOfArrProperties(child))
      })
    }
  }

  addClassesSubfilter() {
    this.formArrayFactory.add(this.nextIndex(), this.createSubgroupOfArrClasses())
  }

  removeSubfilter(i: number) {
    this.formArrayFactory.remove(i)

    if (this.childrenLength() == 1 && this.formArrayFactory.parent.factoryType === 'array') {
      const parent = this.formArrayFactory.parent as QfFormArrayFactory
      parent.removeLastChild()
    }
  }

  splitSubfilter(i: number) {
    const initVal = this.formArrayFactory.valueChanges$.value
    const subgroup = this.createSubgroupOfArrSoubgroup(initVal);
    this.formArrayFactory.remove(i)
    this.formArrayFactory.add(i, subgroup)
  }

  addPropertiesSubfilter() {
    this.formArrayFactory.add(this.nextIndex(), this.createSubgroupOfArrProperties())
  }
  addSubgroupItem() {
    this.formArrayFactory.add(this.nextIndex(), this.createSubgroupItem())
  }

  private createSubgroupOfArrSoubgroup(initVal?: FilterDefNode): QfFormNodeConfig {
    const arraySubgroup = this.formArrayFactory.config.data.arraySubgroup;
    const pkClasses$ = arraySubgroup.pkClasses$
    const propertyOptions$ = arraySubgroup.propertyOptions$
    if (pkClasses$) {
      return this.createSubfroupWithPkClasses(pkClasses$, initVal)
    } else if (propertyOptions$) {
      return this.createSubgroupWithProperties(propertyOptions$, initVal)
    }
  }

  private createSubgroupOfArrClasses(initVal?: FilterDefNode): QfFormNodeConfig {
    const classTypes$ = this.formArrayFactory.valueChanges$.pipe<{ data: ClassAndTypeSelectModel }, ClassAndTypeSelectModel>(
      filter(x => !!x && !!x.data),
      map(x => x.data)
    )
    const propertyOptions$: Observable<PropertyOption[]> = this.i.getPropertyOptions$(classTypes$)

    return this.createSubgroupWithProperties(propertyOptions$, initVal)
  }

  private createSubgroupWithProperties(propertyOptions$: Observable<PropertyOption[]>, initVal: FilterDefNode) {
    return {
      array: {
        placeholder: '',
        data: {
          arraySubgroup: {
            propertyOptions$,
            initVal: initVal || { data: {}, children: [] }
          }
        },
        mapValue: (x) => {
          const [operator, ...children] = x;
          return {
            data: {
              operator,
              subgroup: 'property'
            },
            children: children.filter(c => !!c)
          };
        }
      }
    };
  }

  private createSubgroupItem(initVal?): QfFormNodeConfig {
    return createSubgroupNodeConfig(this.formArrayFactory.config.data.arraySubgroup, initVal)
  }

  private createSubgroupOfArrProperties(initVal?: FilterDefNode): QfFormNodeConfig {
    const pkClasses$ = this.formArrayFactory.valueChanges$.pipe<{ data: PropertySelectModel }, number[]>(
      // make sure only it passes only if data of the arrayClasses are changed (not children)
      distinctUntilChanged((a, b) => {
        return equals(a.data, b.data)
      }),
      switchMap((x) => combineLatestOrEmpty(
        [
          this.c.pipeTargetClassesOfProperties(x.data.outgoingProperties, true),
          this.c.pipeTargetClassesOfProperties(x.data.ingoingProperties, false),
        ]
      ).pipe(
        map(([out, ing]) => uniq([...out, ...ing]))
      ))
    )
    return this.createSubfroupWithPkClasses(pkClasses$, initVal)
  }

  private createSubfroupWithPkClasses(pkClasses$: Observable<number[]>, initVal: FilterDefNode) {
    return {
      array: {
        placeholder: '',
        data: {
          arraySubgroup: {
            pkClasses$,
            initVal: initVal || { data: {}, children: [] }
          }
        },
        mapValue: (x) => {
          const [operator, ...children] = x;
          return {
            data: {
              operator,
              subgroup: 'classAndType'
            },
            children: children.filter(c => !!c)
          };
        }
      }
    };
  }

  private nextIndex() {
    return this.childrenLength() + 1;
  }
  private childrenLength() {
    return this.formArrayFactory.children.length
  }



}
