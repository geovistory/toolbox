import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemComponent } from './view-field-item.component';

describe('ViewFieldItemComponent', () => {
  let component: ViewFieldItemComponent;
  let fixture: ComponentFixture<ViewFieldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
