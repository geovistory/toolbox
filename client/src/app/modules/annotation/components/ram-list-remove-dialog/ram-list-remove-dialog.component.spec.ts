import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamListRemoveDialogComponent } from './ram-list-remove-dialog.component';

describe('RamListRemoveDialogComponent', () => {
  let component: RamListRemoveDialogComponent;
  let fixture: ComponentFixture<RamListRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamListRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamListRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
