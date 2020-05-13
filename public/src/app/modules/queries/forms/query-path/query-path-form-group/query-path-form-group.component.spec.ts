import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPathFormGroupComponent } from './query-path-form-group.component';

describe('QueryPathFormGroupComponent', () => {
  let component: QueryPathFormGroupComponent;
  let fixture: ComponentFixture<QueryPathFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPathFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPathFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
