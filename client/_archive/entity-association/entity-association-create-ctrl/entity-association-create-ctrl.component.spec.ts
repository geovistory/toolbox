import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAssociationCreateCtrlComponent } from './entity-association-create-ctrl.component';

describe('EntityAssociationCreateCtrlComponent', () => {
  let component: EntityAssociationCreateCtrlComponent;
  let fixture: ComponentFixture<EntityAssociationCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAssociationCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAssociationCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
