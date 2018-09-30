import { InfPlace } from 'app/core/sdk';
import { PlaceDetailService } from './place-detail';


describe('PlaceDetailService', () => {
    let service: PlaceDetailService;
    let place: InfPlace;
    beforeEach(() => {
        place = new InfPlace({ fk_class: 123, lat: 213.2, long: 789.12 })
        service = new PlaceDetailService();
        // ... preparation
    });

    it('#from should return an object containg given place', () => {
        expect(service.createState(undefined, place, undefined, undefined).place).toBe(place)
    });

});
