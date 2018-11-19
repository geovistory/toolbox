import { UiElement } from 'app/core/active-project/active-project.models';

// The options for PropertyField or PropSet available to add to a class instance
export interface AddOptionI {
    label: string,
    uiElement: UiElement,
    added: boolean
}

export class AddOption implements AddOptionI {
    label: string;
    uiElement: UiElement;
    added: boolean;

    constructor(data?: AddOptionI) {
        Object.assign(this, data);
    }
}
