import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfTemporalEntity, InfRole, InfPersistentItem, InfAppellation, InfLanguage, DfhProperty, DfhClass } from "app/core";
import { ExistenceTime } from "./components/existence-time";

export type CollapsedExpanded = 'collapsed' | 'expanded';

export type EditorStates =
    'view'  // readonly state. no buttons to switch to edit state, no remove buttons, ect. 
    | 'editable' // read state with buttons to switch to edit state, with remove buttons, ect.
    | 'edit' // write state. inputs or forms are visible and allow to modify data.
    | 'create' // write state. intputs or forms are visible and allow to create new data.
    | 'add'  // allow to add existing data to the project.
    | 'add-pe-it'  // allow to add an existing PeIt to the project.
    | 'selectProp'
    | 'create-pe-it' // create a new PeIt.
    | 'create-pe-it-role'  // create a pe-it-role at once with child te-ent and te-ent-roles 
    | 'create-te-ent-role'  // create a pe-te-ent-role
    | 'exist-time'


// export interface ITeRoleWrapper {
//     data: {
//         role$: BehaviorSubject<InfRole>,
//     }

//     gui: {
//         state$: BehaviorSubject<'view' | 'editable' | 'edit'>,
//         toggle$: BehaviorSubject<CollapsedExpanded>,
//         ontoInfoVisible$: BehaviorSubject<boolean>,
//     }

//     children: {
//         peItWrapper$?: BehaviorSubject<ITeEntWrapper>,
//         appellationWrapper$?: BehaviorSubject<IAppellationWrapper>,
//         languageWrapper$?: BehaviorSubject<ILanguageWrapper>
//     }
// }

// export interface IAppellationWrapper {
//     data: {
//         appellation$: BehaviorSubject<InfAppellation>,
//     }
//     gui: {
//         state$: BehaviorSubject<'view' | 'editable' | 'edit'>,
//     }
// }



// export interface ILanguageWrapper {
//     data: {
//         language$: BehaviorSubject<InfLanguage>,
//     }
//     gui: {
//         state$: BehaviorSubject<'view' | 'editable' | 'edit'>,
//     }
// }
