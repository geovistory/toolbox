import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldEmptyDropListComponent } from './view-field-empty-drop-list.component';

describe('ViewFieldEmptyDropListComponent', () => {
  let component: ViewFieldEmptyDropListComponent;
  let fixture: ComponentFixture<ViewFieldEmptyDropListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldEmptyDropListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldEmptyDropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
