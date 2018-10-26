import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, PeItDetail, InfDigitalObject } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TextEditor } from './api/text-editor.models';
import { TextEditorAPIEpics } from './api/text-editor.epics';
import { TextEditorAPIActions } from './api/text-editor.actions';
import { textEditorReducer } from './api/text-editor.reducer';
import { dropLast } from 'ramda';
import { DfhConfig } from '../../shared/dfh-config';
import { takeUntil, filter, first } from 'rxjs/operators';
import { QuillDoc } from 'app/modules/quill';
import { IVersion } from '../../components/version-picker/version-picker.component';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: textEditorReducer
})
@Component({
  selector: 'gv-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent extends TextEditorAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TextEditor>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() digitalObject$: Observable<InfDigitalObject>;
  @select() versionList$: Observable<IVersion[]>;
  @select() quillDoc$: Observable<QuillDoc>;
  @select() readOnly$: Observable<boolean>;
  @select() creatingAnnotation$: Observable<boolean>;

  parentPeIt$: Observable<PeItDetail>;
  pkProject$: Observable<number>;

  editedQuillDoc: QuillDoc;

  pkSection: number;
  pkProject: number;


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
    this.parentPeIt$ = this.ngRedux.select(dropLast(2, this.basePath))
    this.pkProject$ = this.ngRedux.select(['activeProject', 'pk_project'])

    // get the pk_entity of the section
    combineLatest(this.pkProject$, this.parentPeIt$).pipe(
      first(d => (d.filter(i => !i).length === 0)),
      takeUntil(this.destroy$)).subscribe((d) => {
        const section = d[1], pkProject = d[0]
        if (section.pkEntity) {
          this.pkSection = section.pkEntity;
          this.pkProject = pkProject;
          this.load(pkProject, section.pkEntity, DfhConfig.PROPERTY_PK_IS_REPRODUCTION_OF_SECTION)
          // search for entity_associations from that section to a digital object that has a quill_doc
          // to find the Text

        }
      })

    this.quillDoc$.takeUntil(this.destroy$).subscribe(qd => { this.editedQuillDoc = qd })


    // give editorQuillDoc to Input of gv-quil-edit
    // 1. subscribe to quillDoc$. Update editorQuillDoc on first truthy value
    // 2. update quillDoc in state onQuillChanges
    // 3. onSave, use quillDoc in state to save it
    // 4. onCancel, flicker editorQuillDoc to null and then to previous value

    // If no such ea and digital object, the first save of the editor contents will create a new ea and digital_object

    // else show the content in the editor. Save will create a new version.
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  quillDocChange(q: QuillDoc) {
    this.editedQuillDoc = q;
  }

  onSave() {
    this.save(this.pkProject, {
      ...this.localStore.getState().digitalObject,
      js_quill_data: this.editedQuillDoc
    })
  }

  onCancel() {
    this.editedQuillDoc = this.localStore.getState().quillDoc;
    this.setReadOnly(true)
  }

  onStartEdit() {
    this.setReadOnly(false)
  }

  /**
   * called when user changes version of a digital object
   */
  onVersionChange(version: IVersion) {
    this.changeVersion(version);
  }
}
