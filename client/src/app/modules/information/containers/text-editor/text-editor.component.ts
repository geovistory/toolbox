import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TextEditor } from './api/text-editor.models';
import { TextEditorAPIEpics } from './api/text-editor.epics';
import { TextEditorAPIActions } from './api/text-editor.actions';
import { textEditorReducer } from './api/text-editor.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textEditorReducer
})
@Component({
  selector: 'gv-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent  extends  TextEditorAPIActions  implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextEditor>;

  // path to the substore
  @Input() basePath: string[];
  
  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TextEditorAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
   }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, textEditorReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
