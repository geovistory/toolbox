import { TestBed } from '@angular/core/testing';
import { ReduxStoreModule } from './redux-store.module';


describe('ReduxStoreModule', () => {
  let module: ReduxStoreModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxStoreModule
      ]
    })
    module = TestBed.get(ReduxStoreModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
