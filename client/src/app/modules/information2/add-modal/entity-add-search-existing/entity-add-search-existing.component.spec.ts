import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddSearchExistingComponent } from './entity-add-search-existing.component';

describe('EntityAddSearchExistingComponent', () => {
  let component: EntityAddSearchExistingComponent;
  let fixture: ComponentFixture<EntityAddSearchExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddSearchExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddSearchExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
