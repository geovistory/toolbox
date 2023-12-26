import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityWithFieldsComponent } from './entity-with-fields.component';

describe('EntityWithFieldsComponent', () => {
  let component: EntityWithFieldsComponent;
  let fixture: ComponentFixture<EntityWithFieldsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityWithFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityWithFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
