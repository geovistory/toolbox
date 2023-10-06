import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ObservableStore } from '@ngrx/store';
import { Subject } from 'rxjs';
import { BasicService } from './basic.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BasicService
  ],
  declarations: []
})
export class BasicModule { }


/**
 * DEPRECATED: This model is not part of our design pattern, but still used at some places
 * Interface of a component that is connected to a slice of the
 * redux store.
 */
export interface SubstoreComponent {
  destroy$: Subject<boolean>;
  localStore: ObservableStore<any>;
  basePath?;
}

