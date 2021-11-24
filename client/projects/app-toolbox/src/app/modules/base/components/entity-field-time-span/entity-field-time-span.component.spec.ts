import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFieldTimeSpanComponent } from './entity-field-time-span.component';

describe('EntityFieldTimeSpanComponent', () => {
  let component: EntityFieldTimeSpanComponent;
  let fixture: ComponentFixture<EntityFieldTimeSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityFieldTimeSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFieldTimeSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
