import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddAddExistingComponent } from './entity-add-add-existing.component';

describe('EntityAddAddExistingComponent', () => {
  let component: EntityAddAddExistingComponent;
  let fixture: ComponentFixture<EntityAddAddExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddAddExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddAddExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
