import { TestBed } from '@angular/core/testing';
import { moduleImports } from "projects/lib-queries/src/__tests__/helpers/module-imports";
import { ReduxQueriesModule } from './redux-queries.module';


describe('ReduxQueriesModule', () => {
  let module: ReduxQueriesModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    })
    module = TestBed.inject(ReduxQueriesModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
