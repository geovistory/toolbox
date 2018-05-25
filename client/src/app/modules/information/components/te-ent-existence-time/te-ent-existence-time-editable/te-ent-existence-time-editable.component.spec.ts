import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntExistenceTimeEditableComponent } from './te-ent-existence-time-editable.component';

describe('TeEntExistenceTimeEditableComponent', () => {
  let component: TeEntExistenceTimeEditableComponent;
  let fixture: ComponentFixture<TeEntExistenceTimeEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntExistenceTimeEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntExistenceTimeEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
