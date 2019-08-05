import { Component, OnInit, Input } from '@angular/core';
import { FieldDefinition } from '../../../information/new-components/properties-tree/properties-tree.models';
import { PropertyTreeService } from '../../../information/new-components/properties-tree/properties-tree.service';
import { Observable, combineLatest } from '../../../../../../node_modules/rxjs';
import { ActiveProjectService } from '../../../../core';
import { DfhSelector } from '../../../../core/dfh/dfh.service';
import { ProSelector } from '../../../../core/pro/pro.service';
import { SystemSelector } from '../../../../core/sys/sys.service';
import { map, mergeMap } from '../../../../../../node_modules/rxjs/operators';

interface FieldConfig extends FieldDefinition {
  dfhStandardLabel: string,
  labelTable: {
    displayedColumns: string[],
    rows: {
      label: string,
      language: string
    }[]
  },
  classTable: {
    displayedColumns: string[],
    rows: {
      label: string,
    }[]
  }
}

@Component({
  selector: 'gv-class-config',
  templateUrl: './class-config.component.html',
  styleUrls: ['./class-config.component.scss']
})
export class ClassConfigComponent implements OnInit {

  @Input() fkAppContext: number
  @Input() fkClass: number
  @Input() fkProject: number

  classLabel$: Observable<string>
  fields$: Observable<FieldConfig[]>

  constructor(
    private t: PropertyTreeService,
    private dfh: DfhSelector,
    private sys: SystemSelector,
    private pro: ProSelector,
  ) {
  }

  ngOnInit() {

    // this.dfh.klass.loadClassesOfProjectProfiles(this.fkProject);

    // this.pro.class_field_config.load('', this.fkProject)
    // this.pro.dfh_class_proj_rel.load('', this.fkProject)

    // this.dfh.label.loadLabelesOfClasses(null);
    // this.dfh.label.loadLabelesOfProperties(null);

    // this.sys.system_relevant_class.load();
    // this.sys.class_has_type_property.load();
    // this.dfh.property_view.load()
    // this.dfh.label.loadLabelesOfClasses(null);
    // this.dfh.label.loadLabelesOfProperties(null);


    this.classLabel$ = this.t.pipeLabelOfClass(this.fkClass)
    this.fields$ = this.t.pipeFieldDefinitions(this.fkClass, this.fkAppContext).pipe(
      mergeMap(fields => combineLatest(fields
        //Pipe aspects of each field
        .map(field => combineLatest(
          this.t.pipeDfhProperyStandardLabel(field.pkProperty),

        ).pipe(
          map(([dfhStandardLabel]) => {
            const f: FieldConfig = {
              ...field,
              dfhStandardLabel,
              labelTable: {
                displayedColumns: ['label', 'language'],
                rows: [
                  { label: 'Bla', language: 'en' }
                ]
              },
              classTable: {
                displayedColumns: ['label'],
                rows: [
                  { label: 'Bla' }
                ]
              }
            }
            return f;
          })
        )
        )))
    )
  }

}
