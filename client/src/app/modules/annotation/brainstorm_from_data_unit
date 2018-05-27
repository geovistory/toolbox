import { Chunk } from "./brainstorm_from_source";

export interface InfDigitalObject  {

}

export interface MentioningsPanelState {
    edit: MentioningEditorState,
    view: { [key: string]: MentioningState }
}

export interface MentioningState {
    sourceLabel: string;
    fkDigitalObject: number;

    chunks: { [key: string]: Chunk };
}

export interface MentioningEditorState extends MentioningState {
    selectingSource: boolean;
    selectingChunks: boolean;

}

const mentioningsPanel: MentioningsPanelState = {
    edit: {
        selectingSource: false,
        selectingChunks: true,
        sourceLabel: 'Quelle A',
        fkDigitalObject: 12,
        chunks: {}
    },
    view: {
        _mention_1: {
            sourceLabel: 'Quelle A',
            fkDigitalObject: 12,
            chunks: {}
        }
    }
}


/**
 * Container to manage the Mentionings: Create, show, edit, delete
 * - interacts with store
 * - interacts with api
 * 
 * 
 */
export class MentioningsPanelComponent {

    //@select() edit$
    //@select() view$

    /**
     * Start new mentioning
     * - builds a new mentioningState and adds it to substore path 'edit'
     */
    startCreate() { }

    /**
     * Start edit mentioning
     * - takes the mentioningState from ['view', key] (leaf it there, will not be visible)
     * - adds a deep copy of the mentioningState to ['edit']
     */
    startEdit(key) { }

    /**
     * Cancels edit mentioning
     * - resets substore path 'edit' to null
     */
    cancelEdit() { }

    /**
     * Saves mentioning 
     * - gets the data from formControl of mentioningCtrlComponent 
     * - calls api to findOrCreate InfChunk with InfEntityAssociation[] with InfEntityProjectRel[]
     * - on success add mentioning to substore path 'view'
     */
    save() { }


}