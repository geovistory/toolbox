import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryPathFormComponent } from './query-path-form.component';

describe('QueryPathFormComponent', () => {
  let component: QueryPathFormComponent;
  let fixture: ComponentFixture<QueryPathFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryPathFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryPathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
