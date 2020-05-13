import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExistingEntityComponent } from './search-existing-entity.component';

describe('SearchExistingEntityComponent', () => {
  let component: SearchExistingEntityComponent;
  let fixture: ComponentFixture<SearchExistingEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchExistingEntityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExistingEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
