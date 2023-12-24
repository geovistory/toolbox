import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemEntityMenuComponent } from './view-field-item-entity-menu.component';

describe('ViewFieldItemEntityMenuComponent', () => {
  let component: ViewFieldItemEntityMenuComponent;
  let fixture: ComponentFixture<ViewFieldItemEntityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemEntityMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemEntityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
