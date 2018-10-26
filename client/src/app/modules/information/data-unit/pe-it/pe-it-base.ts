import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { PeItActions } from './pe-it.actions';
import { FormBuilder } from '@angular/forms';
import { DataUnitBase } from '../data-unit.base';
import { PeItApiEpics } from './api/pe-it.epics';
import { RootEpics } from 'app/core/store/epics';
import { Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { DataUnitAPIEpics } from '../data-unit.epics';
import { SectionList } from '../../containers/section-list/api/section-list.models';
import { map } from 'rxjs/operators';


export abstract class PeItBase extends DataUnitBase {

    @Input() basePath: string[];
    @select() sectionList$: Observable<SectionList>;
    @select() showHeader$: Observable<boolean>;
    @select() showPropertiesHeader$: Observable<boolean>;


    // Left Panel Sections
    @select() showProperties$: Observable<boolean>;
    @select() showSectionList$: Observable<boolean>;
    @select() showRepros$: Observable<boolean>;

    // Right Panel Sections
    @select() showMap$: Observable<boolean>;
    @select() showTimeline$: Observable<boolean>;
    @select() showAssertions$: Observable<boolean>;
    @select() showMentionedEntities$: Observable<boolean>;

    // Toggle Buttons (left panel)
    @select() showPropertiesToggle$: Observable<boolean>;
    @select() showSectionListToggle$: Observable<boolean>;
    @select() showReprosToggle$: Observable<boolean>;

    // Toggle Buttons (right panel)
    @select() showMapToggle$: Observable<boolean>;
    @select() showTimelineToggle$: Observable<boolean>;
    @select() showMentionedEntitiesToggle$: Observable<boolean>;
    @select() showAssertionsToggle$: Observable<boolean>;

    // Visibility of container elements, set by function below
    showRightPanel$: Observable<boolean>;
    showLeftPanel$: Observable<boolean>;

    // array of pks of loading leaf-pe-its
    pksOfloadingLeafPeIts: number[] = [];

    constructor(
        protected rootEpics: RootEpics,
        protected dataUnitEpics: DataUnitAPIEpics,
        protected epics: PeItApiEpics,
        protected ngRedux: NgRedux<IAppState>,
        protected actions: PeItActions,
        protected fb: FormBuilder,
    ) {
        super(ngRedux, fb, rootEpics, dataUnitEpics);
    }

    getBasePath = () => this.basePath;

    abstract initPeItBaseChild(): void;

    init() {
        this.basePath = this.getBasePath();

        this.rootEpics.addEpic(this.epics.createEpics(this));

        /**
         * Keeps track of all sections in the right panel.
         * If at least one is visible, show the right panel,
         * else hide it.
         */
        this.showLeftPanel$ = combineLatest(
            this.showProperties$,
            this.showSectionList$,
            this.showRepros$
        ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));


        /**
         * Keeps track of all sections in the right panel.
         * If at least one is visible, show the right panel,
         * else hide it.
         */
        this.showRightPanel$ = combineLatest(
            this.showMap$,
            this.showTimeline$,
            this.showAssertions$,
            this.showMentionedEntities$
        ).pipe(map((bools) => ((bools.filter((bool) => (bool === true)).length > 0))));


        // call hook for child classes
        this.initPeItBaseChild();

    }

}
