import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { ClassAndTypeSelectModel } from "@kleiolab/lib-redux";
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormControlFactory } from '../../../../lib/form-factory/core/form-control-factory';
import { TableFormService } from '../../../../services/table-form.service';
import { MapAndTimeContFormControlComponent } from '../map-and-time-cont-form-control/map-and-time-cont-form-control.component';
import { MapAndTimeContFormArrayFactory } from '../map-and-time-cont-form/map-and-time-cont-form.component';
import { FilterDefinition } from '../query-filter/query-filter.component';

@Component({
  selector: 'gv-map-and-time-cont-form-array',
  templateUrl: './map-and-time-cont-form-array.component.html',
  styleUrls: ['./map-and-time-cont-form-array.component.scss'],
  providers: [TableFormService],
  standalone: true,
  imports: [NgIf, MatListModule, MatLineModule, MatDividerModule, NgFor, NgClass, MatButtonModule, MapAndTimeContFormControlComponent, PortalModule, MatFormFieldModule, AsyncPipe]
})
export class MapAndTimeContFormArrayComponent  {
  @Input() formArrayFactory: MapAndTimeContFormArrayFactory;

  constructor(private t: TableFormService) { }

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
