import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewFieldBodyComponent } from './view-field-body.component';


describe('SubfieldComponent', () => {
  let component: ViewFieldBodyComponent;
  let fixture: ComponentFixture<ViewFieldBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFieldBodyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
