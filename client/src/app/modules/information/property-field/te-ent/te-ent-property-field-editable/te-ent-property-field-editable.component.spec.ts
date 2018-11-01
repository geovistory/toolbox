import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntPropertyFieldEditableComponent } from './te-ent-property-field-editable.component';

describe('TeEntPropertyFieldEditableComponent', () => {
  let component: TeEntPropertyFieldEditableComponent;
  let fixture: ComponentFixture<TeEntPropertyFieldEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntPropertyFieldEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntPropertyFieldEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
