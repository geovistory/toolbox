import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ValuePreviewComponent } from './value-preview.component';


describe('ValuePreviewComponent', () => {
  let component: ValuePreviewComponent;
  let fixture: ComponentFixture<ValuePreviewComponent>;

  beforeEach(async(() => {
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
