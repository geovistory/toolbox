import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarEntityPreviewApi } from 'app/core';
import { RootEpics } from 'app/core/redux-store/epics';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // select observables of substore properties
  createEntityPreviewsLoading: boolean;
  createEntityPreviewsInfo: string;

  constructor(
    protected rootEpics: RootEpics,
    private warEntityPreviewApi: WarEntityPreviewApi) { }


  ngOnInit() {
  }
  createAllEntityPreviews() {
    this.createEntityPreviewsLoading = true;
    this.warEntityPreviewApi.createAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this.createEntityPreviewsLoading = false;
        this.createEntityPreviewsInfo = res;
      },
      (err) => {
        this.createEntityPreviewsLoading = false;
        this.createEntityPreviewsInfo = err;
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
