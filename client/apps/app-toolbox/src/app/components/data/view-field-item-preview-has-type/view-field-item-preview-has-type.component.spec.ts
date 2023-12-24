import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFieldItemPreviewHasTypeComponent } from './view-field-item-preview-has-type.component';


describe('ViewFieldItemHasTypePreviewComponent', () => {
  let component: ViewFieldItemPreviewHasTypeComponent;
  let fixture: ComponentFixture<ViewFieldItemPreviewHasTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFieldItemPreviewHasTypeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemPreviewHasTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
