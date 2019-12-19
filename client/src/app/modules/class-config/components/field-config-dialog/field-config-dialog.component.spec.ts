import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldConfigDialogComponent } from './field-config-dialog.component';

describe('FieldConfigDialogComponent', () => {
  let component: FieldConfigDialogComponent;
  let fixture: ComponentFixture<FieldConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
