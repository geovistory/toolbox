import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAssociationCreateOrAddComponent } from './entity-association-create-or-add.component';

describe('EntityAssociationCreateOrAddComponent', () => {
  let component: EntityAssociationCreateOrAddComponent;
  let fixture: ComponentFixture<EntityAssociationCreateOrAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAssociationCreateOrAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAssociationCreateOrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
