import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, SysConfig } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number

  loadingAlternatives$ = new BehaviorSubject<boolean>(false);

  alternatives$;

  appContext: number = SysConfig.PK_UI_CONTEXT_ADD;

  constructor(
    public t: PropertyTreeService,
    public p: ActiveProjectService,
    public inf: InfActions
  ) {

  }

  ngOnInit() {
    combineLatest(this.p.pkProject$, this.t.showControl$).pipe(first(), takeUntil(this.destroy$)).subscribe(([pkProject, listDefinition]) => {
      if (listDefinition.isOutgoing) {
        this.loadingAlternatives$.next(true)
        this.inf.role.loadOutgoingAlternatives(this.pkEntity, listDefinition.pkProperty, pkProject).resolved$
          .pipe(takeUntil(this.destroy$)).subscribe(resolved => {
            this.loadingAlternatives$.next(false)
          })
      }
      else {

        this.loadingAlternatives$.next(true)
        this.inf.role.loadIngoingAlternatives(this.pkEntity, listDefinition.pkProperty, pkProject).resolved$
          .pipe(takeUntil(this.destroy$))
          .subscribe(resolved => {
            this.loadingAlternatives$.next(false)
          })

        this.alternatives$ = this.t.pipeAlternativeIngoingRoles(listDefinition.pkProperty, this.pkEntity)
      }



    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
