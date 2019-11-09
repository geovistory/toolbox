import { FormArray } from '@angular/forms';
import { clone } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { FormArrayConfig, FormFactoryGlobal, FormNodeConfig } from '../services/form-factory.service';
import { FormControlFactory } from './form-control-factory';
import { AbstractControlFactory, combineLatestOrEmpty, FactoryType } from './form-factory.models';
import { FormGroupFactory } from './form-group-factory';
import { FormChildFactory } from './form-child-factory';

/**
 * Factory for a formArray, being an intermediate node of the nested form
 *
 */
export class FormArrayFactory<C, A> extends AbstractControlFactory {

  factoryType: FactoryType = 'array';
  control: FormArray
  children: (FormControlFactory<C> | FormArrayFactory<C, A> | FormChildFactory<C>)[] = []

  childConfigs: FormNodeConfig<any, any, any, any>[] = []
  // this is only needed if this is a list Factory (having only one type of children)
  defaultChildConfig: FormNodeConfig<any, any, any, any>

  childFactoryValues$ = new BehaviorSubject<Observable<any>[]>([]);

  constructor(
    public globalConfig: FormFactoryGlobal<any, any, any, any>,
    public config: FormArrayConfig<A>,
    public level: number,
    public parent: FormGroupFactory | FormArrayFactory<C, A>
  ) {
    super()

    this.children = []
    this.control = this.globalConfig.fb.array([])

    const childNodes$ = this.globalConfig.getChildNodeConfigs({ array: this.config })
    /**
     * First
     */
    let count = 0;
    childNodes$.pipe(takeUntil(this.globalConfig.destroy$))
      .subscribe(childConfigs => {
        if (count === 0) {
          let $;
          // If this is a list it contains an array of children of the same configuration
          if (this.config.isList) {
            this.defaultChildConfig = childConfigs[0];

            // Here do not need to add a child on init. This may depend on the case.
            for (let i = 0; i < (this.config.addOnInit || 0); i++) {
              this.add(i, this.defaultChildConfig)
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
  }



  private create(i: FormNodeConfig<any, any, any, any>): FormControlFactory<C> | FormArrayFactory<C, A> | FormChildFactory<C> {
    if (i.array) return new FormArrayFactory(this.globalConfig, i.array, this.level + 1, this)
    if (i.control) return new FormControlFactory(this.globalConfig, i.control, this.level + 1, this)
    if (i.childFactory) return new FormChildFactory(this.globalConfig, i.childFactory, this.level + 1, this)
  }

  add(i: number, c: FormNodeConfig<any, any, any, any>) {
    const f = this.create(c)
    this.children.splice(i, 0, f)
    if (f.factoryType !== 'childFactory') {
      this.control.insert(i, f.control)
    }
    else {
      const childF = f as FormChildFactory<C>;
      const count = 0;
      childF.control$.pipe(takeUntil(this.globalConfig.destroy$))
        .subscribe(c => {
          count === 0 ?
            this.control.insert(i, c) :
            this.control.setControl(i, c)
        })
    }
    this.childConfigs.splice(i, 0, c)

    this.childFactoryValues$.pipe(first()).subscribe(vs$ => {
      vs$.splice(i, 0, f.valueChanges$)
      this.childFactoryValues$.next(vs$)
    })

  }

  /**
   * add control at last position of array
   */
  append(c: FormNodeConfig<any, any, any, any>) {
    this.add(this.control.length, c)
  }
  /**
 * add control at first position of array
 */
  prepend(c: FormNodeConfig<any, any, any, any>) {
    this.add(0, c)
  }

  onAdd() {
    this.add(this.control.length, this.defaultChildConfig)
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

  }

  removeAllChildren() {
    while (this.children.length) {
      this.remove(0)
    }
  }
  removeLastChild() {
    this.remove(this.children.length - 1)
  }

  markAllAsTouched() {
    this.control.markAsTouched()
    this.children.forEach(child => {
      child.markAllAsTouched()
    })
  }
}

