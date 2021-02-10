import { FormArray, FormGroup } from '@angular/forms';
import { clone } from 'ramda';
import { BehaviorSubject, Observable, merge, combineLatest, of } from 'rxjs';
import { first, map, switchMap, takeUntil, startWith } from 'rxjs/operators';
import { FormFactoryGlobal } from "../services/FormFactoryGlobal";
import { FormNodeConfig } from "../services/FormNodeConfig";
import { FormArrayConfig } from "../services/FormArrayConfig";
import { FormControlFactory } from './form-control-factory';
import { AbstractControlFactory, combineLatestOrEmpty, FactoryType, StatusChange } from './form-factory.models';
import { FormGroupFactory } from './form-group-factory';
import { FormChildFactory } from './form-child-factory';
import { moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * Factory for a formArray, being an intermediate node of the nested form
 *
 */
export class FormArrayFactory<C, A, Ch> extends AbstractControlFactory {

  factoryType: FactoryType = 'array';
  control: FormArray
  children: (FormControlFactory<C> | FormArrayFactory<C, A, Ch> | FormChildFactory<Ch>)[] = []

  childConfigs: FormNodeConfig<any, any, any, any>[] = []
  // this is only needed if this is a list Factory (having only one type of children)
  defaultChildConfig: FormNodeConfig<any, any, any, any>

  childFactoryValues$ = new BehaviorSubject<Observable<any>[]>([]);
  childFactoryStatuses$ = new BehaviorSubject<Observable<StatusChange>[]>([]);

  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormArrayConfig<A>,
    public level: number,
    public parent: FormGroupFactory | FormArrayFactory<C, A, Ch>
  ) {
    super()

    this.children = []
    const validators = config.validators || []
    this.control = this.globalConfig.fb.array([], validators)

    const childNodes$ = this.globalConfig.getChildNodeConfigs({ array: this.config })
    const defaultChildConfigs$ = this.globalConfig.getChildNodeConfigs({
      array: {
        ...this.config,
        initValue: undefined
      }
    })
    if (!defaultChildConfigs$) console.error('no defaultChildConfigs$ created for ', this.config)
    const defaultChildConfig$ = defaultChildConfigs$.pipe(map(cs => cs[0]))

    if (!childNodes$) console.error('no childNodes$ created for ', this.config)
    /**
     * First
     */
    let count = 0;
    combineLatest(childNodes$, defaultChildConfig$).pipe(takeUntil(this.globalConfig.destroy$))
      .subscribe(([childConfigs, defaultChildConfig]) => {
        if (count === 0) {
          let $;
          // If this is a list it contains an array of children of the same configuration
          if (this.config.isList) {
            this.defaultChildConfig = defaultChildConfig;

            // if there is an array of initial values, add a child for each
            if (this.config.initValue && this.config.initValue.length > 0) {
              for (let i = 0; i < (this.config.initValue.length); i++) {
                this.add(i, childConfigs[i])
              }
            }
            // if there should be empty children (without initial value), add them here
            else if (this.config.addOnInit) {

              // Add n empty children (n = addOnInit);
              for (let i = 0; i < (this.config.addOnInit || 0); i++) {
                this.add(i, this.defaultChildConfig)
              }
            }

            $ = this.childFactoryValues$.pipe(
              switchMap(vs$ => combineLatestOrEmpty(vs$).pipe(
                map(items => {
                  return this.config.mapValue(items);
                }),
              ))
            )
          }
          // If this is no list, children have different configurations
          else {

            // Here we always need all children to be added on init
            childConfigs.forEach((c, i) => {
              this.add(i, c)
            });

            $ = this.childFactoryValues$.pipe(
              switchMap(vs$ => combineLatestOrEmpty<any>(vs$).pipe(
                map(items => {
                  return this.config.mapValue(items);
                })
              ))
            )

          }

          $.pipe(takeUntil(this.globalConfig.destroy$))
            .subscribe(x => {
              this.valueChanges$.next(x)
            })

        } else {
          const removed = []
          this.childConfigs.forEach(c => {
            if (!childConfigs.find(newC => newC.id === c.id)) {
              removed.push(c)
            }
          })
          removed.forEach(c => {
            const i = this.childConfigs.findIndex(oldC => oldC.id === c.id)
            this.remove(i)
          })

          childConfigs.forEach((c, i) => {
            if (!this.childConfigs.find(newC => newC.id === c.id)) {
              this.add(i, c)
            }
          });
        }
        count++;
      });

    // emit status changes
    combineLatest(
      merge(of(this.control.status), this.control.statusChanges),
      this.childFactoryStatuses$.pipe(
        switchMap(s$ => combineLatest(s$))
      )
    ).pipe(
      map(([status, childStatuses]) => {
        const s: StatusChange = {
          status,
          errors: this.control.errors,
          children: childStatuses
        }
        return s
      }),
      takeUntil(this.globalConfig.destroy$)
    ).subscribe(x => this.statusChanges$.next(x))
  }



  private create(i: FormNodeConfig<any, any, any, any>): FormControlFactory<C> | FormArrayFactory<C, A, Ch> | FormChildFactory<Ch> {
    if (i.array) return new FormArrayFactory(this.globalConfig, i.array, this.level + 1, this)
    if (i.control) return new FormControlFactory(this.globalConfig, i.control, this.level + 1, this)
    if (i.childFactory) return new FormChildFactory(this.globalConfig, i.childFactory, this.level + 1, this)
  }

  add(i: number, c: FormNodeConfig<any, any, any, any>) {
    const f = this.create(c)

    // add child factory
    this.children.splice(i, 0, f)

    // add child control
    if (f.factoryType !== 'childFactory') {
      this.control.insert(i, f.control)
    }
    else {
      const childF = f as FormChildFactory<Ch>;
      const count = 0;
      childF.control$.pipe(takeUntil(this.globalConfig.destroy$))
        .subscribe((c: FormGroup) => {
          count === 0 ?
            this.control.insert(i, c) :
            this.control.setControl(i, c)
        })
    }

    // add child config
    this.childConfigs.splice(i, 0, c)

    // add value emitter
    this.childFactoryValues$.pipe(first()).subscribe(vs$ => {
      vs$.splice(i, 0, f.valueChanges$)
      this.childFactoryValues$.next(vs$)
    })

    // add status emitter
    this.childFactoryStatuses$.pipe(first()).subscribe(s$ => {
      s$.splice(i, 0, f.statusChanges$)
      this.childFactoryStatuses$.next(s$)
    })

    return f
  }

  /**
   * add control at last position of array
   */
  append(c: FormNodeConfig<any, any, any, any>) {
    return this.add(this.control.length, c)
  }

  /**
   * add control arrayat last position of array
   */
  appendMany(cs: FormNodeConfig<any, any, any, any>[]) {
    return cs.map(c => this.append(c))
  }

  /**
   * add control at first position of array
   */
  prepend(c: FormNodeConfig<any, any, any, any>) {
    return this.add(0, c)
  }

  appendDefault() {
    return this.add(this.control.length, this.defaultChildConfig)
  }
  prependDefault() {
    return this.add(0, this.defaultChildConfig)
  }

  onRemove(i) {
    this.remove(i)
  }

  remove(i) {

    this.children.splice(i, 1)
    this.childConfigs.splice(i, 1)
    this.control.removeAt(i)


    this.childFactoryValues$.pipe(first()).subscribe(vs$ => {
      vs$.splice(i, 1)
      this.childFactoryValues$.next(vs$)
    })

    // remove status emitter
    this.childFactoryStatuses$.pipe(first()).subscribe(s$ => {
      s$.splice(i, 1)
      this.childFactoryStatuses$.next(s$)
    })

  }

  removeAllChildren() {
    while (this.children.length) {
      this.remove(0)
    }
  }
  removeLastChild() {
    this.remove(this.children.length - 1)
  }


  moveItemInArray(previousIndex: number, currentIndex: number) {
    // move child control
    const control = this.control.at(previousIndex);
    this.control.removeAt(previousIndex);
    this.control.insert(currentIndex, control);

    // move child factory
    moveItemInArray(this.children, previousIndex, currentIndex);

    // move child config
    moveItemInArray(this.childConfigs, previousIndex, currentIndex);

    // move value emitter
    this.childFactoryValues$.pipe(first()).subscribe(vs$ => {
      moveItemInArray(vs$, previousIndex, currentIndex);
      this.childFactoryValues$.next(vs$)
    })

    // move status emitter
    this.childFactoryStatuses$.pipe(first()).subscribe(s$ => {
      moveItemInArray(s$, previousIndex, currentIndex);
      this.childFactoryStatuses$.next(s$)
    })

  }

  markAllAsTouched() {
    this.control.markAsTouched()
    this.children.forEach(child => {
      child.markAllAsTouched()
    })
  }

}

