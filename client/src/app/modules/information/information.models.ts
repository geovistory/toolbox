import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfTemporalEntity, InfRole, InfPersistentItem, InfAppellation, InfLanguage } from "app/core";
import { ExistenceTime } from "./components/existence-time";

export type CollapsedExpanded = 'collapsed' | 'expanded';

export interface IPeItWrapper {
    data: {
        peIt$: BehaviorSubject<InfPersistentItem>,
    }

    gui: {
        displayLabel$: BehaviorSubject<string>,
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
        editorCollapsed$: BehaviorSubject<CollapsedExpanded>,
        ontoInfoVisible$: BehaviorSubject<boolean>,
    }

    children: {
        roles$: BehaviorSubject<InfRole[]>,
    }
}

export interface IPiRoleWrapper {
    data: {
        role$: BehaviorSubject<InfRole>,
    }

    gui: {
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
        editorCollapsed$: BehaviorSubject<CollapsedExpanded>,
        ontoInfoVisible$: BehaviorSubject<boolean>,
    }

    children: {
        teEntWrapper$?: BehaviorSubject<ITeEntWrapper>,
      }
}


export interface ITeEntWrapper {
    data: {
        teEnt$: BehaviorSubject<InfTemporalEntity>,
    }

    gui: {
        displayLabel$: BehaviorSubject<string>,
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
        editorCollapsed$: BehaviorSubject<CollapsedExpanded>,
        ontoInfoVisible$: BehaviorSubject<boolean>,
    }

    children: {
        roles$: BehaviorSubject<InfRole[]>,
        existenceTime: BehaviorSubject<ExistenceTime>
    }
}


export interface ITeRoleWrapper {
    data: {
        role$: BehaviorSubject<InfRole>,
    }

    gui: {
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
        editorCollapsed$: BehaviorSubject<CollapsedExpanded>,
        ontoInfoVisible$: BehaviorSubject<boolean>,
    }

    children: {
        peItWrapper$?: BehaviorSubject<ITeEntWrapper>,
        appellationWrapper$?: BehaviorSubject<IAppellationWrapper>,
        languageWrapper$?:BehaviorSubject<ILanguageWrapper>
    }
}

export interface IAppellationWrapper {
    data: {
        appellation$: BehaviorSubject<InfAppellation>,
    }
    gui: {
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
    }
}



export interface ILanguageWrapper {
    data: {
        language$: BehaviorSubject<InfLanguage>,
    }
    gui: {
        editorState$: BehaviorSubject<'view' | 'editable' | 'edit'>,
    }
}
