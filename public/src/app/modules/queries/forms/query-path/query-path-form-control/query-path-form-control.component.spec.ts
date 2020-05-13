import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPathFormControlComponent } from './query-path-form-control.component';

describe('QueryPathFormControlComponent', () => {
  let component: QueryPathFormControlComponent;
  let fixture: ComponentFixture<QueryPathFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPathFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPathFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
