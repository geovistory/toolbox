import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanHelpDialogComponent } from './view-time-span-help-dialog.component';

describe('ViewTimeSpanHelpDialogComponent', () => {
  let component: ViewTimeSpanHelpDialogComponent;
  let fixture: ComponentFixture<ViewTimeSpanHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanHelpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
