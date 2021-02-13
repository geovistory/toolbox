import { TestBed } from '@angular/core/testing';
import { ReduxQueriesModule } from './redux-queries.module';


describe('ReduxQueriesModule', () => {
  let module: ReduxQueriesModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxQueriesModule
      ]
    })
    module = TestBed.get(ReduxQueriesModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
