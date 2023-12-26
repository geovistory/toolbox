import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityMenuClassItemComponent } from './add-entity-menu-class-item.component';

describe('AddEntityMenuClassItemComponent', () => {
  let component: AddEntityMenuClassItemComponent;
  let fixture: ComponentFixture<AddEntityMenuClassItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntityMenuClassItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityMenuClassItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
