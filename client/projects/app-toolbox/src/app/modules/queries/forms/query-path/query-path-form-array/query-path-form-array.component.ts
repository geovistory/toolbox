import { Component, Input, OnInit } from '@angular/core';
import { InformationPipesService } from '@kleiolab/lib-redux';
import { QueryPathSegment } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { classesSegmentConfig, propertiesSegmentConfig, QueryPathFormArrayFactory } from '../query-path-form/query-path-form.component';

@Component({
  selector: 'gv-query-path-form-array',
  templateUrl: './query-path-form-array.component.html',
  styleUrls: ['./query-path-form-array.component.scss']
})
export class QueryPathFormArrayComponent implements OnInit {
  @Input() formArrayFactory: QueryPathFormArrayFactory;

  get lastChild() {
    return this.formArrayFactory.children[this.formArrayFactory.children.length - 1]
  }
  constructor(
    private i: InformationPipesService
  ) { }

  ngOnInit() {
    // console.log(this.formArrayFactory.children)
  }

  /**
   * adds a new propertiesSegmentConfig
   */
  private addPropertiesSegment() {
    const options$ = this.lastChild.valueChanges$.pipe(
      switchMap((v: QueryPathSegment) => this.i.pipePropertyOptionsFromClassesAndTypes(v.data))
    )
    const disabled$ = this.getDisabled();
    const x = propertiesSegmentConfig(options$, disabled$)
    this.formArrayFactory.append(x.c)
  }

  /**
   * adds a new classesSegmentConfig
   */
  private addClassesSegment() {
    const options$ = this.lastChild.valueChanges$.pipe(
      switchMap((v: QueryPathSegment) => this.i.pipePkClassesFromPropertySelectModel(v.data))
    )
    const disabled$ = this.getDisabled();
    const x = classesSegmentConfig(options$, disabled$)
    this.formArrayFactory.append(x.c)
  }
  private getDisabled(): BehaviorSubject<boolean> {
    const currentIndex = this.formArrayFactory.children.length + 1;
    const b = new BehaviorSubject(false);
    const disabled$ = this.formArrayFactory.childFactoryValues$.pipe(
      map(v => {
        // console.log(v.length, currentIndex)
        return v.length > currentIndex
      }),
    );
    b.pipe(mergeMap(() => disabled$))
    return b
  }

  addSegment() {
    if (this.formArrayFactory.globalConfig.root.formGroup.valid) {

      if (this.lastChild.controlFactory?.config.data.propertiesSegment) {
        this.addClassesSegment()
      } else if (this.lastChild.controlFactory?.config.data.classesSegment) {
        this.addPropertiesSegment()
      }
    } else {
      this.formArrayFactory.globalConfig.root.formFactory.markAllAsTouched()
    }
  }

  /**
   * removes segment with given index
   */
  removeSegment(index: number) {
    this.formArrayFactory.remove(index)
  }

}
