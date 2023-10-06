import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, createReducer } from '@ngrx/store';
import { first, toArray } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { IAppState } from './root/models/model';

const testScheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal
  expect(actual).toEqual(expected);
});
// Straight Jasmine testing without Angular's testing support
describe('Store', () => {
  let store: Store<IAppState>;
  beforeEach(() => {
    const initialState: IAppState = {
      inf: {
        lang_string: {
          by_pk_entity: {
            123: { pk_entity: 123, fk_class: 1, fk_language: 2, quill_doc: {}, string: 'hello' }
          }
        }
      }
    }
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(createReducer(initialState))],
    });
    store = TestBed.inject(Store);
  })

  it('#select should return app state', (done) => {
    const q$ = store.select(s => s.inf.lang_string.by_pk_entity['123'].string).pipe(first())
    const expectedSequence = ['hello']
    q$.pipe(toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);
  });

});
