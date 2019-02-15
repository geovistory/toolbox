import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSelectComponent } from './operator-select.component';

describe('OperatorSelectComponent', () => {
  let component: OperatorSelectComponent;
  let fixture: ComponentFixture<OperatorSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
