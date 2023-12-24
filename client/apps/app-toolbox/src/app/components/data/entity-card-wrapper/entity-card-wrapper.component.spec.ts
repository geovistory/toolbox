import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCardWrapperComponent } from './entity-card-wrapper.component';

describe('EntityCardWrapperComponent', () => {
  let component: EntityCardWrapperComponent;
  let fixture: ComponentFixture<EntityCardWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityCardWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
