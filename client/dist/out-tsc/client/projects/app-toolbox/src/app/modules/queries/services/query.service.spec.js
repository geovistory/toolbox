import { TestBed, inject } from '@angular/core/testing';
import { QueryService } from './query.service';
describe('QueryService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [QueryService]
        });
    });
    it('should be created', inject([QueryService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=query.service.spec.js.map