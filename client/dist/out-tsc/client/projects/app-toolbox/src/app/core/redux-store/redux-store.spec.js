import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { first, toArray } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    expect(actual).toEqual(expected);
});
// Straight Jasmine testing without Angular's testing support
describe('NgRedux', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgReduxModule],
        });
        service = TestBed.get(NgRedux);
        service.configureStore((state, a) => {
            return state;
        }, {
            inf: {
                lang_string: {
                    by_pk_entity: {
                        123: { pk_entity: 123, fk_class: 1, fk_language: 2, quill_doc: {}, string: 'hello' }
                    }
                }
            }
        });
    });
    it('#select should return app state', (done) => {
        const q$ = service.select(['inf', 'lang_string', 'by_pk_entity', 123, 'string']).pipe(first());
        const expectedSequence = ['hello'];
        q$.pipe(toArray())
            .subscribe(actualSequence => {
            expect(actualSequence).toEqual(expectedSequence);
        }, null, done);
    });
});
//# sourceMappingURL=redux-store.spec.js.map