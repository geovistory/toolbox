import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';
import { ActiveProjectService } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { first, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { Subject, combineLatest } from '../../../../../../node_modules/rxjs';
import { ListDefinition } from '../properties-tree/properties-tree.models';

@Component({
  selector: 'gv-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number

  loadingAlternatives: boolean;

  alternatives$;

  constructor(
    public t: PropertyTreeService,
    public p: ActiveProjectService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    combineLatest(this.p.pkProject$, this.t.showControl$).pipe(first(), takeUntil(this.destroy$)).subscribe(([pkProject, listDefinition]) => {
      if(listDefinition.isOutgoing){
        this.loadingAlternatives = true
        this.inf.role.loadOutgoingAlternatives(this.pkEntity, listDefinition.pkProperty, pkProject).resolved$
        .pipe(takeUntil(this.destroy$)).subscribe(resolved => {
          this.loadingAlternatives = false
        })
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
