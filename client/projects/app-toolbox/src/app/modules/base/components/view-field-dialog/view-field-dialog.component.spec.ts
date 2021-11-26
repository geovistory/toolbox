import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewFieldDialogComponent } from './view-field-dialog.component';


describe('SubfieldDialogComponent', () => {
  let component: ViewFieldDialogComponent;
  let fixture: ComponentFixture<ViewFieldDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFieldDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
