import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPathFormArrayComponent } from './query-path-form-array.component';

describe('QueryPathFormArrayComponent', () => {
  let component: QueryPathFormArrayComponent;
  let fixture: ComponentFixture<QueryPathFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPathFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPathFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
