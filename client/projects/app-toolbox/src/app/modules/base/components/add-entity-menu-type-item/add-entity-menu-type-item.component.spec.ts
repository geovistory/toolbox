import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityMenuTypeItemComponent } from './add-entity-menu-type-item.component';

describe('AddEntityMenuTypeItemComponent', () => {
  let component: AddEntityMenuTypeItemComponent;
  let fixture: ComponentFixture<AddEntityMenuTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntityMenuTypeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityMenuTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
