import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntCreateCtrlComponent } from './te-ent-create-ctrl.component';

describe('TeEntCreateCtrlComponent', () => {
  let component: TeEntCreateCtrlComponent;
  let fixture: ComponentFixture<TeEntCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
