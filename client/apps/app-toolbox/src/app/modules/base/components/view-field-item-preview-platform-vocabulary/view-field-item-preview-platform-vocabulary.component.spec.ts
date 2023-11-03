import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFieldItemPreviewComponent } from './view-field-item-preview-platform-vocabulary.component';


describe('ViewFieldItemPreviewComponent', () => {
  let component: ViewFieldItemPreviewComponent;
  let fixture: ComponentFixture<ViewFieldItemPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFieldItemPreviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
