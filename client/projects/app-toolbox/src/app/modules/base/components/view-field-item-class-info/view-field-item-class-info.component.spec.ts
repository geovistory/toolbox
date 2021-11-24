import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemClassInfoComponent } from './view-field-item-class-info.component';

describe('ViewFieldItemClassInfoComponent', () => {
  let component: ViewFieldItemClassInfoComponent;
  let fixture: ComponentFixture<ViewFieldItemClassInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemClassInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
