import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfieldDialogComponent } from './subfield-dialog.component';

describe('SubfieldDialogComponent', () => {
  let component: SubfieldDialogComponent;
  let fixture: ComponentFixture<SubfieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubfieldDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
