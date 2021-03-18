import { TestBed } from '@angular/core/testing';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { ReduxModule } from './redux-store.module';


describe('ReduxModule', () => {
  let module: ReduxModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxModule,
        SdkLb3Module.forRoot(), // lib-sdk-lb3
        SdkLb4Module
      ]
    })
    module = TestBed.get(ReduxModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
