export interface DataUnitPreviewList { [pk_entity: number]: DataUnitPreview };

export class DataUnitPreview {

    pk_entity: number;
    fk_class: number;
    fk_project: number;
    entity_label: string;
    class_label: string;
    type_label: string;
    entity_type: string;

    constructor(data?: DataUnitPreview) {
        Object.assign(this, data);
    }
}
