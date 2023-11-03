import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { StateModule } from './state.module';


describe('StateModule', () => {
  let module: StateModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StateModule,
        SdkLb4Module
      ]
    })
    module = TestBed.inject(StateModule);
  });

  it('should be created', () => {
    expect(module).toBeTruthy();
  });

});
