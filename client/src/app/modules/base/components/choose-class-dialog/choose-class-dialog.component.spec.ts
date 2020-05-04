import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseClassDialogComponent } from './choose-class-dialog.component';

describe('ChooseClassDialogComponent', () => {
  let component: ChooseClassDialogComponent;
  let fixture: ComponentFixture<ChooseClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
