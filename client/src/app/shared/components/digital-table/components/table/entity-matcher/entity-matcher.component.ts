import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-entity-matcher',
  templateUrl: './entity-matcher.component.html',
  styleUrls: ['./entity-matcher.component.scss']
})
export class EntityMatcherComponent implements OnInit {

  // the subject of the refers to statment
  @Input() pkCell: number

  // the object of the refers to statement
  pkEntity$: Observable<number>

  constructor(private p: ActiveProjectService) { }

  ngOnInit() {

    // pipe the pkEntity$
    this.pkEntity$ = this.p.inf$.statement$.by_subject_and_property$({
      fk_subject_tables_cell: this.pkCell,
      fk_property: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO
    }).pipe(
      map((statements) => {
        if (statements.length) return statements[0].fk_object_info
      })
    )
  }





}
