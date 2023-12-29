import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValuePreviewComponent } from './value-preview.component';


describe('ValuePreviewComponent', () => {
  let component: ValuePreviewComponent;
  let fixture: ComponentFixture<ValuePreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
