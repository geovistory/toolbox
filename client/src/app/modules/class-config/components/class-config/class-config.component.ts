import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { combineLatest, Observable, of } from '../../../../../../node_modules/rxjs';
import { map, mergeMap } from '../../../../../../node_modules/rxjs/operators';
import { FieldDefinition } from '../../../information/new-components/properties-tree/properties-tree.models';
import { ConfigurationPipesService } from '../../../information/new-services/configuration-pipes.service';

interface FieldConfig extends FieldDefinition {
  propertyField?: {
    dfhStandardLabel: string,
    isIdentityDefining: boolean,
    labelTable: {
      fkProperty: number,
      fkDomainClass: number,
      fkRangeClass: number
    },
    classTable: {
      displayedColumns: string[],
      rows: {
        label: string,
      }[]
    },
    targetClasses: {
      label: string,
      pkClass: number
    }[]

  }
}

@Component({
  selector: 'gv-class-config',
  templateUrl: './class-config.component.html',
  styleUrls: ['./class-config.component.scss']
})
export class ClassConfigComponent implements OnInit {

  @HostBinding('class.mat-typography') true;

  @Input() fkAppContext: number
  @Input() fkClass: number
  @Input() fkProject: number

  classLabel$: Observable<string>
  fields$: Observable<FieldConfig[]>

  constructor(
    private c: ConfigurationPipesService
  ) {
  }
  getKey(_, item) {
    return _;
  }
  ngOnInit() {


    this.classLabel$ = this.c.pipeLabelOfClass(this.fkClass)
    this.fields$ = this.c.pipeFieldDefinitions(this.fkClass, this.fkAppContext).pipe(
      mergeMap(fields => combineLatest(fields
        // Pipe aspects of each field
        .map(field => {

          // If this field is a class Field
          if (!field.pkProperty) {
            return of({
              ...field
            })
          }

          // If this field is a property field
          return combineLatest(
            this.c.pipeDfhProperyStandardLabel(field.pkProperty)
          ).pipe(
            map(([dfhStandardLabel]) => {
              const f: FieldConfig = {
                ...field,
                propertyField: {
                  isIdentityDefining: field.listDefinitions[0].isIdentityDefining,
                  dfhStandardLabel,
                  labelTable: {
                    fkProperty: field.pkProperty,
                    fkDomainClass: (field.isOutgoing ? this.fkClass : null),
                    fkRangeClass: (field.isOutgoing ? null : this.fkClass)
                  },
                  classTable: {
                    displayedColumns: ['label'],
                    rows: field.listDefinitions.map(ld => ({
                      label: ld.targetClassLabel
                    }))
                  },
                  targetClasses: field.listDefinitions.map(ld => ({
                    pkClass: ld.targetClass,
                    label: ld.targetClassLabel
                  }))
                }
              }
              return f;
            })
          )
        }
        )))
    )
  }


}
