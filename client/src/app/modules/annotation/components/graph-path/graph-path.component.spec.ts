import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPathComponent } from './graph-path.component';

describe('GraphPathComponent', () => {
  let component: GraphPathComponent;
  let fixture: ComponentFixture<GraphPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
