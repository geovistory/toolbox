import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntExistenceTimeEditComponent } from './te-ent-existence-time-edit.component';

describe('TeEntExistenceTimeEditComponent', () => {
  let component: TeEntExistenceTimeEditComponent;
  let fixture: ComponentFixture<TeEntExistenceTimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntExistenceTimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntExistenceTimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
