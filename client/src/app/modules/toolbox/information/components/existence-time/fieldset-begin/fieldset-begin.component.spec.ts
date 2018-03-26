import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetBeginComponent } from './fieldset-begin.component';

describe('FieldsetBeginComponent', () => {
  let component: FieldsetBeginComponent;
  let fixture: ComponentFixture<FieldsetBeginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsetBeginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsetBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
