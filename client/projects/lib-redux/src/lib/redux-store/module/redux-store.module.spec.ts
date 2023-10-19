import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { ReduxModule } from './redux-store.module';


describe('ReduxModule', () => {
  let module: ReduxModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReduxModule,
        SdkLb4Module
      ]
    })
    module = TestBed.inject(ReduxModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
