import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyRouteComponent } from './proxy-route.component';

describe('ProxyRouteComponent', () => {
  let component: ProxyRouteComponent;
  let fixture: ComponentFixture<ProxyRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
