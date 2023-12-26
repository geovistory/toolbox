import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Field, SectionName } from '@kleiolab/lib-redux';
import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';
import { ClassFieldsSectionComponent } from '../class-fields-section/class-fields-section.component';

interface FieldConfig extends Field {
  propertyField?: {
    identityDefiningForSource: boolean,
    // labelTable: {
    //   fkProperty: number,
    //   fkDomainClass: number,
    //   fkRangeClass: number
    // },
    // classTable: {
    //   displayedColumns: string[],
    //   rows: {
    //     label: string,
    //   }[]
    // },
    targetClasses: {
      label: string,
      pkClass: number
    }[]
  },
  fieldConfig?: ProClassFieldConfig
}
@Component({
    selector: 'gv-class-fields',
    templateUrl: './class-fields.component.html',
    styleUrls: ['./class-fields.component.scss'],
    standalone: true,
    imports: [ClassFieldsSectionComponent]
})
export class ClassFieldsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() fkProject: number
  @Input() fkClass: number
  // @Input() fkAppContext: number

  basic = SectionName.basic;
  metadata = SectionName.metadata;
  specific = SectionName.specific;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() { }

}
