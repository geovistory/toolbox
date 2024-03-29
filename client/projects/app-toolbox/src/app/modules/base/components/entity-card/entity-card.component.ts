import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../services/edit-mode.service';

/**
 * This component is a standalone view for an entity
 */
@Component({
  selector: 'gv-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityCardComponent implements OnInit {
  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() scope: GvFieldPageScope;
  @Input() showOntoInfo$: BehaviorSubject<boolean>;
  readmode$: Observable<boolean>;

  constructor(public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.source) errors.push('@Input() source is required.');
    if (!this.pkClass$) errors.push('@Input() pkClass$ is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
  }
}
