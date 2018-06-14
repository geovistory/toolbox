import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntAddCtrlComponent } from './te-ent-add-ctrl.component';

describe('TeEntAddCtrlComponent', () => {
  let component: TeEntAddCtrlComponent;
  let fixture: ComponentFixture<TeEntAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
