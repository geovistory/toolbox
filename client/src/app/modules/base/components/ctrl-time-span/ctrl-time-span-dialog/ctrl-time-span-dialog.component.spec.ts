import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlTimeSpanDialogComponent } from './ctrl-time-span-dialog.component';

describe('CtrlTimeSpanDialogComponent', () => {
  let component: CtrlTimeSpanDialogComponent;
  let fixture: ComponentFixture<CtrlTimeSpanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrlTimeSpanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlTimeSpanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
