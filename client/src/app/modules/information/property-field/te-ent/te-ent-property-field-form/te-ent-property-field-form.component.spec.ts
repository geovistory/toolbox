import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntPropertyFieldFormComponent } from './te-ent-property-field-form.component';

describe('TeEntPropertyFieldFormComponent', () => {
  let component: TeEntPropertyFieldFormComponent;
  let fixture: ComponentFixture<TeEntPropertyFieldFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntPropertyFieldFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntPropertyFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
