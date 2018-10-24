import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { PeItActions } from './pe-it.actions';
import { FormBuilder } from '@angular/forms';
import { DataUnitBase } from '../data-unit.base';
import { PeItApiEpics } from './api/pe-it.epics';
import { RootEpics } from 'app/core/store/epics';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUnitAPIEpics } from '../data-unit.epics';
import { SectionList } from '../../containers/section-list/api/section-list.models';

export abstract class PeItBase extends DataUnitBase {

    @Input() basePath: string[];
    @select() showPropertiesHeader$: Observable<boolean>;
    @select() showHeader$: Observable<boolean>;
    @select() showRightPanel$: Observable<boolean>;
    @select() showMap$: Observable<boolean>;
    @select() showTimeline$: Observable<boolean>;
    @select() showMentionedEntities$: Observable<boolean>;
    @select() showAssertions$: Observable<boolean>;
    @select() showSectionList$: Observable<boolean>;
    @select() showRepros$: Observable<boolean>;
    @select() sectionList$: Observable<SectionList>;

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

        // call hook for child classes
        this.initPeItBaseChild();
    }

}
