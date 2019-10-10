import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAssociationExistingListComponent } from './entity-association-existing-list.component';

describe('EntityAssociationExistingListComponent', () => {
  let component: EntityAssociationExistingListComponent;
  let fixture: ComponentFixture<EntityAssociationExistingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAssociationExistingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAssociationExistingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
