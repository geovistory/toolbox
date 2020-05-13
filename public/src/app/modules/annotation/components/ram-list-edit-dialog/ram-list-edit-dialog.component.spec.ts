import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamListEditDialogComponent } from './ram-list-edit-dialog.component';

describe('RamListEditDialogComponent', () => {
  let component: RamListEditDialogComponent;
  let fixture: ComponentFixture<RamListEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamListEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamListEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
