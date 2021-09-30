import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Field, SectionName } from '@kleiolab/lib-queries';
import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { Subject } from 'rxjs';

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
  styleUrls: ['./class-fields.component.scss']
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
