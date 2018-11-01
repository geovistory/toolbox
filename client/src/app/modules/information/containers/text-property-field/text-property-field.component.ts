import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TextPropertyField } from './api/text-property-field.models';
import { TextPropertyFieldAPIEpics } from './api/text-property-field.epics';
import { TextPropertyFieldAPIActions } from './api/text-property-field.actions';
import { textPropertyListReducer } from './api/text-property-field.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textPropertyListReducer
})
@Component({
  selector: 'gv-text-property-field',
  templateUrl: './text-property-field.component.html',
  styleUrls: ['./text-property-field.component.css']
})
export class TextPropertyFieldComponent  extends  TextPropertyFieldAPIActions  implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextPropertyField>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TextPropertyFieldAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
   }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, textPropertyListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
