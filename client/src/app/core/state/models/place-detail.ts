import { InfPlace } from 'app/core/sdk';

export interface PlaceDetailI {
    place?: InfPlace
}

export class PlaceDetail implements PlaceDetailI {

    place?: InfPlace;

    constructor(data?: PlaceDetailI) {
        Object.assign(this, data);
    }

}
