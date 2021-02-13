import { TestBed, inject } from '@angular/core/testing';
import { D3Service } from './d3.service';
describe('D3Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [D3Service]
        });
    });
    it('should be created', inject([D3Service], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=d3.service.spec.js.map