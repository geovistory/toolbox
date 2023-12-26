import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCardHeaderComponent } from './entity-card-header.component';

describe('EntityCardHeaderComponent', () => {
  let component: EntityCardHeaderComponent;
  let fixture: ComponentFixture<EntityCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityCardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
