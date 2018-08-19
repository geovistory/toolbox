import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntEditableComponent } from './te-ent-editable.component';

describe('TeEntEditableComponent', () => {
  let component: TeEntEditableComponent;
  let fixture: ComponentFixture<TeEntEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
