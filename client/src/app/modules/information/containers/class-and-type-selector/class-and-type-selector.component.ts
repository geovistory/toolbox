import { Component, OnDestroy, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ClassAndTypeSelector, ClassAndTypePk } from './api/class-and-type-selector.models';
import { ClassAndTypeSelectorAPIEpics } from './api/class-and-type-selector.epics';
import { ClassAndTypeSelectorAPIActions } from './api/class-and-type-selector.actions';
import { classAndTypeSelectorReducer } from './api/class-and-type-selector.reducer';
import { TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewI18n } from 'ngx-treeview';
import { ClassAndTypeSelectorI18n } from './class-and-type-selector-i18n';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classAndTypeSelectorReducer
})
@Component({
  selector: 'gv-class-and-type-selector',
  templateUrl: './class-and-type-selector.component.html',
  styleUrls: ['./class-and-type-selector.component.css'],
  providers: [
    { provide: TreeviewI18n, useClass: ClassAndTypeSelectorI18n }
  ]
})
export class ClassAndTypeSelectorComponent extends ClassAndTypeSelectorAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ClassAndTypeSelector>;

  // path to the substore
  @Input() basePath: string[];

  // classes for which types should be loaded and that are selectable
  @Input() pkClasses: number[];

  // project of which types should be loaded
  @Input() pkProject: number;

  // text
  @Input() buttonText = 'Select';

  // placement
  @Input() placement: 'right' | 'left' = 'left';

  // has filter
  @Input() hasFilter = false;



  // On user select class or type
  @Output() select = new EventEmitter<ClassAndTypePk>();


  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<TreeviewItem[]>;

  selectedItem: TreeviewItem;

  config: TreeviewConfig;
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  private dropdownTreeviewSelectI18n: ClassAndTypeSelectorI18n;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ClassAndTypeSelectorAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public i18n: TreeviewI18n
  ) {
    super();


  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, classAndTypeSelectorReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load(this.pkClasses, this.pkProject)

    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: this.hasFilter,
      maxHeight: 500
    });

    this.dropdownTreeviewSelectI18n = this.i18n as ClassAndTypeSelectorI18n;

    this.dropdownTreeviewSelectI18n.text = this.buttonText;

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




  onSelectClick(item: TreeviewItem) {
    this.dropdownTreeviewComponent.dropdownDirective.close();
    if (this.selectedItem !== item) {
      this.selectedItem = item;
      this.select.emit({ pkClass: item.value.pkClass, pkType: item.value.pkType });
    }
  }

}
