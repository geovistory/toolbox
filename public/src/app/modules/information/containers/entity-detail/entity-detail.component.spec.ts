import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDetailComponent } from './entity-detail.component';

describe('PeItEditableComponent', () => {
  let component: EntityDetailComponent;
  let fixture: ComponentFixture<EntityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
