import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityFieldComponent } from './entity-field.component';

describe('EntityFieldComponent', () => {
  let component: EntityFieldComponent;
  let fixture: ComponentFixture<EntityFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
