import { Component, Input, OnInit } from '@angular/core';
import { ClassAndTypeSelectModel } from "@kleiolab/lib-redux";
import { FormControlFactory } from 'projects/app-toolbox/src/app/modules/form-factory/core/form-control-factory';
import { FilterDefinition } from 'projects/app-toolbox/src/app/modules/queries/components/query-filter/query-filter.component';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { TableFormService } from '../../table/table-form/table-form.service';
import { MapAndTimeContFormArrayFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';

@Component({
  selector: 'gv-map-and-time-cont-form-array',
  templateUrl: './map-and-time-cont-form-array.component.html',
  styleUrls: ['./map-and-time-cont-form-array.component.scss'],
  providers: [TableFormService]
})
export class MapAndTimeContFormArrayComponent implements OnInit {
  @Input() formArrayFactory: MapAndTimeContFormArrayFactory;

  constructor(private t: TableFormService) { }

  ngOnInit() {
    console.log(this.formArrayFactory.children)
  }


  addQueryDefinition(child: FormControlFactory<any>) {
    const selectedClasses$: Observable<ClassAndTypeSelectModel> = child.valueChanges$
    selectedClasses$.pipe(first()).subscribe(selectedClasses => {

      const initVal: FilterDefinition = {
        data: selectedClasses,
        children: []
      }
      const conf = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal), initVal);
      const [ctrlRoot, ...rest] = conf.config
      this.formArrayFactory.appendMany(rest)
      child.config.disabled$.next(true)
    })
  }

  removeQueryDefinition(child: FormControlFactory<any>) {
    this.formArrayFactory.removeLastChild()
    this.formArrayFactory.removeLastChild()
    child.config.disabled$.next(false)
  }


}
